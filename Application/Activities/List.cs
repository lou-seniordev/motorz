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
            public Query(int? limit, int? offset, bool isGoing, bool isHost, bool iFollow, bool isCompleted,
                DateTime? startDate, string search)
            {
                Limit = limit;
                Offset = offset;
                IsGoing = isGoing;
                IsHost = isHost;
                IFollow = iFollow;
                IsCompleted = isCompleted;
                StartDate = startDate ?? DateTime.Now;
                Search = search;
            }
            public bool IsCompleted { get; set; }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IsGoing { get; set; }
            public bool IsHost { get; set; }
            public bool IFollow { get; set; }
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
                var user = await _context.Users.SingleOrDefaultAsync(
                   x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Activities
                // .Where(x => x.Date >= request.StartDate)
                // .Where(x => x.IsActive == true)
                .OrderBy(x => x.Date)
                .AsQueryable();

                var activities = new List<Activity>();

                if (!request.IsGoing && !request.IsHost && !request.IFollow && !request.IsCompleted
                && string.IsNullOrEmpty(request.Search))
                {
                    queryable = queryable.Where(x => x.IsActive == true);

                    activities = await GetActivityList(request, queryable, activities);

                }

                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable
                    .Where(x => x.UserActivities
                    .Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                    activities = await GetActivityList(request, queryable, activities);

                }

                if (request.IsHost && !request.IsGoing)
                {
                    queryable = queryable.Where(x => x.UserActivities.Any(
                        a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsHost));
                    activities = await GetActivityList(request, queryable, activities);

                }
                if (request.IsCompleted)
                {
                    // queryable = queryable.Where(x => x.UserActivities.Any(
                    //     a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsHost));
                    queryable = _context.Activities
                        // .Where(x => x.Date >= request.StartDate)
                        .Where(x => x.IsActive == false && x.IsCompleted == true)
                        .OrderBy(x => x.Date)
                        .AsQueryable();
                    activities = await GetActivityList(request, queryable, activities);

                }
                // if (!string.IsNullOrEmpty(request.StartDate.ToString()))
                // {
                //     queryable = _context.Activities
                //         .Where(x => x.Date == request.StartDate)
                //         // .Where(x => x.IsActive == true)
                //         .OrderBy(x => x.Date)
                //         .AsQueryable();
                //     activities = await GetActivityList(request, queryable, activities);

                // }
                if (request.IFollow)
                {
                    var followings = await _context.Followings
                                    .Where(x => x.ObserverId == user.Id)
                                    .Select(x => x.TargetId)
                                    .ToListAsync();

                    var query = new List<Activity>();

                    foreach (var id in followings)
                    {
                        var tempQuery = queryable
                            .Where(x => x.UserActivities
                            .Any(a => a.AppUser.Id == id && a.IsHost));

                        query.AddRange(tempQuery);
                    }
                    activities = query
                                .Skip(request.Offset ?? 0)
                                .Take(request.Limit ?? 3).ToList();

                }
                if (!string.IsNullOrEmpty(request.Search))
                {
                    var search = char.ToUpper(request.Search[0]) + request.Search.Substring(1);

                    queryable = queryable
                    .Where(x =>
                        x.Title.Contains(request.Search) || x.Title.Contains(search) ||
                        x.Description.Contains(request.Search) || x.Description.Contains(search) ||
                        x.City.Equals(request.Search) ||x.City.Equals(search) ||
                        x.Departure.Equals(request.Search) ||
                        x.Destination.Equals(request.Search)
                    );
                    activities = await GetActivityList(request, queryable, activities);

                }

                // activities = await GetActivityList(request, queryable, activities);

                return new ActivitiesEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDto>>(activities),
                    ActivityCount = queryable.Count()
                };
            }

            private static async Task<List<Activity>> GetActivityList(Query request, IQueryable<Activity> queryable, List<Activity> activities)
            {
                activities = await queryable
                                .Skip(request.Offset ?? 0)
                                .Take(request.Limit ?? 3)
                                .ToListAsync();
                return activities;
            }
        }
    }
}