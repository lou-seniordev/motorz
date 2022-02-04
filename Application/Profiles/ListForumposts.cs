using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListForumposts
    {
        public class Query : IRequest<List<UserForumpostDto>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserForumpostDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserForumpostDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                // var queryable = user.UserForumposts
                //     .OrderBy(a => a.Forumpost.DateAdded)
                //     .AsQueryable();
                var queryable = _context.Forumposts
                    // .Where(x => x.Author.UserName == user.UserName)
                    .OrderBy(a => a.DateAdded)
                    .AsQueryable();

                switch (request.Predicate)
                {
                    case "iRated":
                        queryable = queryable
                        .Where(x => x.ForumpostRatings
                        .Any(a => a.Author.Id == user.Id));
                        break;
                    case "iAsked":
                         queryable = queryable.Where(x => x.Author.Id == user.Id);
                        break;
                    default:
                        //  queryable = queryable.Where(x => x.Author.Id == user.Id);
                        break;
                }

                var forumposts = queryable.ToList();
                var forumpostsToReturn = new List<UserForumpostDto>();

                foreach (var forumpost in forumposts)
                {
                    var userForumpost = new UserForumpostDto
                    {
                        Id = forumpost.Id,
                        Title = forumpost.Title,
                        DateAdded = forumpost.DateAdded,
                        Category = forumpost.Category
                    };

                    forumpostsToReturn.Add(userForumpost);
                }

                return forumpostsToReturn;

            }
        }
    }
}