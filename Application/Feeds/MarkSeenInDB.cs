using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Feeds
{
    public class MarkSeenInDB
    {
        public class Command : IRequest
        {
            public string[] Ids { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Ids).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                foreach (var id in request.Ids)
                {
                    var feed = await _context.Feeds.FindAsync(Guid.Parse(id));
                    if (feed != null)
                    {
                        feed.IsSeen = true;
                        feed.DateSeen = DateTime.Now;
                    }
                }

                var success = await _context.SaveChangesAsync() > 0;

                // if (success) 
                return Unit.Value;

                // throw new Exception("Problem Saving Changes");
            }
        }
    }
}