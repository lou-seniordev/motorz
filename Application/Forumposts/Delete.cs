using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Forumposts
{
    public class Delete
    {
         public class Command : IRequest
        {
            public Guid Id { get; set; }
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

                var forumpost = await _context.Forumposts.FindAsync(request.Id);

                if(forumpost == null) 
                    throw new RestException(HttpStatusCode.NotFound, 
                        new {forumpost = "NotFound"});

                var forumpostRatings = await _context.ForumpostRatings
                .Where(x => x.Forumpost.Id == forumpost.Id)
                .ToListAsync();

                var forumpostRatingFeeds = await _context.Feeds
                .Where(x => x.ObjectId == forumpost.Id)
                .ToListAsync();

                _context.RemoveRange(forumpostRatings);
                _context.RemoveRange(forumpostRatingFeeds);
                _context.Remove(forumpost);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}