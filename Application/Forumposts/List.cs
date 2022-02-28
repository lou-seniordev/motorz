using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Forumposts
{
    public class List
    {
        public class ForumpostEnvelope
        {
            public List<ForumpostDto> Forumposts { get; set; }
            public int ForumpostCount { get; set; }
        }

        public class Query : IRequest<ForumpostEnvelope>
        {

            public Query(int? limit, int? offset, bool trending, bool iAsked, bool iRated,
                string category, bool iFollow, string search)
            {
                Limit = limit;
                Offset = offset;
                Trending = trending;
                IAsked = iAsked;
                Category = category;
                IRated = iRated;
                IFollow = iFollow;
                Search = search;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool Trending { get; set; } = true;
            public bool IAsked { get; set; }
            public bool IRated { get; set; }
            public string Category { get; set; }
            public string Search { get; set; }
            public bool IFollow { get; set; }

        }

        public class Handler : IRequestHandler<Query, ForumpostEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<ForumpostEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {

                var queryable = _context.Forumposts
                .OrderByDescending(x => x.DateAdded)
                .AsQueryable();

                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var forumposts = new List<Forumpost>();

                if (!request.Trending && !request.IRated && !request.IAsked && !request.IFollow
                && string.IsNullOrEmpty(request.Category) && string.IsNullOrEmpty(request.Search))
                {                   
                    forumposts = await GetAllForumposts(request, queryable);
                }
                if (request.Trending)
                {
                    queryable = queryable.OrderByDescending(x => x.ForumpostRatings.Count())
                    .Take(5);
                    forumposts = await GetAllForumposts(request, queryable);
                }

                if (request.IRated)
                {
                    queryable = queryable
                    .Where(x => x.ForumpostRatings
                    .Any(a => a.Author.UserName == _userAccessor.GetCurrentUsername()));
                    forumposts = await GetAllForumposts(request, queryable);

                }

                if (request.IAsked)
                {
                    queryable = queryable.Where(x => x.Author.Id == user.Id);
                    forumposts = await GetAllForumposts(request, queryable);

                }
                if (request.IFollow)
                {
                    var followings = await _context.Followings
                                   .Where(x => x.ObserverId == user.Id)
                                   .Select(x => x.TargetId)
                                   .ToListAsync();

                    var query = new List<Forumpost>();

                    foreach (var id in followings)
                    {
                        var tempQuery = queryable
                            .Where(x => x.Author.Id == id);

                        query.AddRange(tempQuery);
                    }
                    forumposts = query
                                .Skip(request.Offset ?? 0)
                                .Take(request.Limit ?? 3).ToList();
                    // queryable = queryable.Where(x => x.Author.Id == user.Id);
                }

                if (!string.IsNullOrEmpty(request.Category))
                {
                    queryable = queryable.Where(x => x.Category == request.Category);
                    forumposts = await GetAllForumposts(request, queryable);

                }

                if (!string.IsNullOrEmpty(request.Search))
                {
                    queryable = queryable
                    .Where(x =>
                        x.Title.Contains(request.Search) ||
                        x.Body.Contains(request.Search) ||
                        x.Category.Equals(request.Search)
                    );
                    forumposts = await GetAllForumposts(request, queryable);

                }

                // forumposts = await GetAllForumposts(request, queryable);

                return new ForumpostEnvelope
                {
                    Forumposts = _mapper.Map<List<Forumpost>, List<ForumpostDto>>(forumposts),
                    ForumpostCount = queryable.Count()
                };

            }

            private static async Task<List<Forumpost>> GetAllForumposts(Query request, IQueryable<Forumpost> queryable)
            {
                return await queryable
                                .Skip(request.Offset ?? 0)
                                .Take(request.Limit ?? 5)
                                .ToListAsync();
            }
        }
    }
}