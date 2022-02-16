using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Feeds
{
    public class RemoveFeedItem
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var notifier = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());


                var feed = await _context.Feeds
                .SingleOrDefaultAsync(x => x.ObjectId == request.Id && x.Notifier.Id == notifier.Id);

                if (feed == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { feed = "Feed Not Found" });

                _context.Remove(feed);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}