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
    public class CreateMotofyComment
    {
         public class Command : IRequest<CommentMotofyDto>
        {
            public string Body { get; set; }
            public Guid MotofyId { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentMotofyDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<CommentMotofyDto> Handle(Command request, CancellationToken cancellationToken)
            {

                var motofy = await _context.Motofies.FindAsync(request.MotofyId);

                if (motofy == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Motofy = "Not found"});

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                var comment = new CommentMotofy
                {
                    Author = user,
                    Motofy = motofy,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                motofy.CommentMotofies.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                                            // mapping to  // mapping from 
                if (success) return _mapper.Map<CommentMotofyDto>(comment);

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}