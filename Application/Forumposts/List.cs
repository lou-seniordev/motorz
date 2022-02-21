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

            public Query(int? limit, int? offset, bool trending, bool iAsked, bool iRated, string category)
            {
                Limit = limit;
                Offset = offset;
                Trending = trending;
                IAsked = iAsked;
                Category = category;
                IRated = iRated;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool Trending { get; set; } = true;
            public bool IAsked { get; set; }
            public bool IRated { get; set; }
            public string Category { get; set; }
            // public bool OfIFollow { get; set; }
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

                if (request.Trending)
                {
                    queryable = queryable.OrderByDescending(x => x.ForumpostRatings.Count())
                    .Take(5);
                }

                if (request.IRated)
                {
                    queryable = queryable
                    .Where(x => x.ForumpostRatings
                    .Any(a => a.Author.UserName == _userAccessor.GetCurrentUsername()));
                }

                if (request.IAsked)
                {
                    queryable = queryable.Where(x => x.Author.Id == user.Id);
                }

                if (!string.IsNullOrEmpty(request.Category))
                {
                    queryable = queryable.Where(x => x.Category == request.Category);
                }

                var forumposts = await queryable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3)
                .ToListAsync();


                return new ForumpostEnvelope
                {
                    Forumposts = _mapper.Map<List<Forumpost>, List<ForumpostDto>>(forumposts),
                    ForumpostCount = queryable.Count()
                };

            }


        }
    }
}