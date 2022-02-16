using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using System.Linq;
using System;
using Application.Interfaces;
namespace Application.Feeds
{
    public class List
    {
        public class FeedEnvelope
        {
            public List<FeedDto> Feeds { get; set; }
            public int FeedCount { get; set; }
        }
        public class Query : IRequest<FeedEnvelope>
        {
            public Query(int? limit, int? offset
            // , bool isGoing, bool isHost, DateTime? startDate
            )
            {
                Limit = limit;
                Offset = offset;
                // IsGoing = isGoing;
                // IsHost = isHost;
                // StartDate = startDate ?? DateTime.Now;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            // public bool IsGoing { get; set; }
            // public bool IsHost { get; set; }
            // public DateTime? StartDate { get; set; }
        }

        public class Handler : IRequestHandler<Query, FeedEnvelope>
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

            public async Task<FeedEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
            
                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Feeds
                .Where(x => x.Notifyees.Any(u => u.AppUserId == user.Id))
                .OrderByDescending(x => x.DateTriggered)
                .AsQueryable();

                // if (request.IsGoing && !request.IsHost)
                // {
                //     queryable = queryable
                //     .Where(x => x.UserActivities.Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                // }

                // if (request.IsHost && !request.IsGoing)
                // {
                //     queryable = queryable.Where(x => x.UserActivities.Any(
                //         a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsHost));
                // }

                var feeds = await queryable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3)
                .ToListAsync();

                return new FeedEnvelope
                {
                    Feeds = _mapper.Map<List<Feed>, List<FeedDto>>(feeds),
                    FeedCount = queryable.Count()
                    
                };


            }

        }
    }
}