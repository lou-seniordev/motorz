using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AllComments
{
    public class CreateMechanicComment
    {
          public class Command : IRequest<CommentMechanicDto>
        {
            public string Body { get; set; }
            public Guid Id { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentMechanicDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<CommentMechanicDto> Handle(Command request, CancellationToken cancellationToken)
            {


                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);


                var mechanic = await _context.Mechanics.FindAsync(request.Id);

                if (mechanic == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Mechanic = "Not found" });

                var comment = new CommentMechanic
                {
                    Author = user,
                    Mechanic = mechanic,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };



                mechanic.CommentMechanics.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                                                  // mapping to  // mapping from 
                if (success) return _mapper.Map<CommentMechanicDto>(comment);

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}