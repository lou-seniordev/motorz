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
    public class CreateForumPostComment
    {
        public class Command : IRequest<CommentForumPostDto>
        {
            public string Body { get; set; }
            public Guid Id { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentForumPostDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<CommentForumPostDto> Handle(Command request, CancellationToken cancellationToken)
            {


                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);


                var forumpost = await _context.Forumposts.FindAsync(request.Id);

                if (forumpost == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Forumpost = "Not found" });

                var comment = new CommentForumPost
                {
                    Author = user,
                    Forumpost = forumpost,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };



                // comment.forumpost = forumpost;

                forumpost.CommentForumPosts.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                // mapping to  // mapping from 
                if (success) return _mapper.Map<CommentForumPostDto>(comment);

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}