using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;


namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>> { }

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly DataContext _context; private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // === Eager loading -> this plus virtual keyword ===
                // .Include(x => x.UserActivities)
                // .ThenInclude(x => x.AppUser)


               // === Lazy loading ===
                var activities = await _context.Activities
                .ToListAsync();


                // var activityToReturn = _mapper.Map<Activity, ActivityDto>(activities);


                // return activities;
                return _mapper.Map<List<Activity>, List<ActivityDto>>(activities);
            }

        }
    }
}