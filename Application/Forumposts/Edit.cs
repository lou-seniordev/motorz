using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
namespace Application.Forumposts
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public DateTime? DateAdded { get; set; }
            public string Title { get; set; }
            public string Body { get; set; }
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
                        new {activity = "NotFound"});

                forumpost.Title = request.Title ?? forumpost.Title;
                forumpost.Body = request.Body ?? forumpost.Body;
                forumpost.DateAdded = request.DateAdded ?? forumpost.DateAdded;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}