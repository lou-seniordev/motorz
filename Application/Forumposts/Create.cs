using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
// using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Forumposts
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            // public virtual AppUser Author { get; set; }
            public DateTime DateAdded { get; set; }
            public string Title { get; set; }
            public string Body { get; set; }
            // public string Username { get; set; }
            public string Category { get; set; }


        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                // var forumpostToSave = _mapper.Map<ForumpostDto, Forumpost>(forumpost);
                // var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == 
                //     request.Username);

                // ako ne bude radilo gornje, a nesto kontam da nece...
                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var forumpost = new Forumpost
                {
                    // Author = user,
                    Id = request.Id,
                    Title = request.Title,
                    // DateAdded = request.
                    // Category = "testing, no reall? still api...",
                    Category = request.Category,
                    DateAdded = request.DateAdded,
                    Body = request.Body
                };

                _context.Forumposts.Add(forumpost);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}