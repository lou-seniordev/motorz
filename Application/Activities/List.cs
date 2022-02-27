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

namespace Application.Activities
{
    public class List
    {
        public class ActivitiesEnvelope
        {
            public List<ActivityDto> Activities { get; set; }
            public int ActivityCount { get; set; }
        }
        public class Query : IRequest<ActivitiesEnvelope>
        {
            public Query(int? limit, int? offset, bool isGoing, bool isHost, bool isCountry,
                DateTime? startDate, string search)
            {
                Limit = limit;
                Offset = offset;
                IsGoing = isGoing;
                IsHost = isHost;
                IsCountry = isCountry;
                StartDate = startDate ?? DateTime.Now;
                Search = search;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IsGoing { get; set; }
            public bool IsHost { get; set; }
            public bool IsCountry { get; set; }
            public DateTime? StartDate { get; set; }
            public string Search { get; set; }

        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
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

            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                // === Eager loading -> this plus virtual keyword ===
                // .Include(x => x.UserActivities)
                // .ThenInclude(x => x.AppUser)

                var queryable = _context.Activities
                .Where(x => x.Date >= request.StartDate)
                .Where(x => x.IsActive == true)
                .OrderBy(x => x.Date)
                .AsQueryable();

                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable
                    .Where(x => x.UserActivities.Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                }

                if (request.IsHost && !request.IsGoing)
                {
                    queryable = queryable.Where(x => x.UserActivities.Any(
                        a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsHost));
                }
                if (request.IsCountry)
                {
                    //see how to solve the country with model or api??
                    queryable = queryable
                         .Where(x => x.UserActivities
                         .Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsHost));
                }
                if (!string.IsNullOrEmpty(request.Search))
                {
                    queryable = queryable
                    .Where(x =>
                        x.Title.Contains(request.Search) ||
                        x.Description.Contains(request.Search) ||
                        x.City.Equals(request.Search) ||
                        x.Venue.Equals(request.Search) ||
                        x.Destination.Equals(request.Search)
                    );
                }

                var activities = await queryable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3)
                .ToListAsync();

                return new ActivitiesEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDto>>(activities),
                    ActivityCount = queryable.Count()
                };
            }

        }
    }
}