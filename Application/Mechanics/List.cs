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

namespace Application.Mechanics
{
    public class List
    {
        public class MechanicsEnvelope
        {
            public List<MechanicDto> Mechanics { get; set; }
            public int MechanicCount { get; set; }
            // public MechanicDto MostEmbraced { get; set; }
            // public MechanicDto HighestRatedMechanic { get; set; }

        }
        public class Query : IRequest<MechanicsEnvelope>
        {

            public Query(int? limit, int? offset, bool isCustomer, bool isClose,
                bool mostRecommended, bool bestRated, string country)
            {
                Limit = limit;
                Offset = offset;
                IsCustomer = isCustomer;
                IsClose = isClose;
                MostRecommended = mostRecommended;
                BestRated = bestRated;
                Country = country;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IsCustomer { get; set; }
            public bool IsClose { get; set; }
            public bool MostRecommended { get; set; }
            public bool BestRated { get; set; }
            public string Country { get; set; }

        }

        public class Handler : IRequestHandler<Query, MechanicsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<MechanicsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.SingleOrDefaultAsync(
                   x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Mechanics
                // .OrderByDescending(x => x.DatePublished)
                .AsQueryable();


                if (!string.IsNullOrEmpty(request.Country))
                {
                    queryable = queryable.Where(x => x.Country.Name == request.Country);
                }

                if (request.IsCustomer)
                {
                    queryable = queryable
                    .Where(x => x.Customers
                    .Any(a => a.AppUser.UserName == user.UserName))
                    .Take(2);
                }
                if (request.MostRecommended)
                {

                    queryable = queryable
                    .OrderByDescending(x => x.TotalRecommended)
                    .Take(2);

                }
                if (request.BestRated)
                {
                    queryable = queryable
                    .OrderByDescending(r => r.AverageRating.Average)
                    .Take(2);
                }

                var mechanics = await queryable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3)
                    .ToListAsync();

                return new MechanicsEnvelope
                {
                    Mechanics = _mapper.Map<List<Mechanic>, List<MechanicDto>>(mechanics),
                    MechanicCount = queryable.Count()
                };
                //_context.Mechanics.ToListAsync();



                // return //.ToListAsync();
            }


        }
    }
}