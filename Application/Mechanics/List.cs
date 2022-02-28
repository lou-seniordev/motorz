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
        }
        public class Query : IRequest<MechanicsEnvelope>
        {

            public Query(int? limit, int? offset, bool isCustomer, bool isClose, bool mostRecommended,
                bool bestRated, string country, bool iFollow, string search)
            {
                Limit = limit;
                Offset = offset;
                IsCustomer = isCustomer;
                //==TODO:::ONCE POSSIBLE==
                IsClose = isClose;
                MostRecommended = mostRecommended;
                BestRated = bestRated;
                Country = country;
                Search = search;
                IFollow = iFollow;


            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IsCustomer { get; set; }
            public bool IsClose { get; set; }
            public bool MostRecommended { get; set; }
            public bool BestRated { get; set; }
            public string Country { get; set; }
            public bool IFollow { get; set; }

            public string Search { get; set; }

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

                var mechanics = new List<Mechanic>();


                if (!request.IsCustomer && !request.MostRecommended && !request.BestRated 
                    && !request.IFollow && string.IsNullOrEmpty(request.Country) 
                    && string.IsNullOrEmpty(request.Search))
                {
                    mechanics = await GetAllMechanics(request, queryable, mechanics);

                }

                if (!string.IsNullOrEmpty(request.Country))
                {
                    queryable = queryable.Where(x => x.Country.Name == request.Country);
                    mechanics = await GetAllMechanics(request, queryable, mechanics);
                }


                if (request.IsCustomer)
                {
                    queryable = queryable
                    .Where(x => x.Customers
                    .Any(a => a.AppUser.UserName == user.UserName))
                    .Take(2);
                    mechanics = await GetAllMechanics(request, queryable, mechanics);

                }
                if (request.MostRecommended)
                {

                    queryable = queryable
                    .OrderByDescending(x => x.TotalRecommended)
                    .Take(2);
                    mechanics = await GetAllMechanics(request, queryable, mechanics);


                }
                if (request.BestRated)
                {
                    queryable = queryable
                    .OrderByDescending(r => r.AverageRating.Average)
                    .Take(2);
                    mechanics = await GetAllMechanics(request, queryable, mechanics);

                }

                if (request.IFollow)
                {
                    var followings = await _context.Followings
                                   .Where(x => x.ObserverId == user.Id)
                                   .Select(x => x.TargetId)
                                   .ToListAsync();

                    var query = new List<Mechanic>();

                    foreach (var id in followings)
                    {
                        var tempQuery = queryable
                            .Where(x => x.Publisher.Id == id);

                        query.AddRange(tempQuery);
                    }
                    mechanics = query
                                .Skip(request.Offset ?? 0)
                                .Take(request.Limit ?? 3).ToList();
                    queryable = queryable.Where(x => x.Publisher.Id == user.Id);

                }

                if (!string.IsNullOrEmpty(request.Search))
                {
                    queryable = queryable
                    .Where(x =>
                        x.Name.Contains(request.Search) ||
                        x.Description.Contains(request.Search) ||
                        x.City.Equals(request.Search) ||
                        x.Address.Equals(request.Search) ||
                        x.Owner.Equals(request.Search)
                    );
                    mechanics = await GetAllMechanics(request, queryable, mechanics);
                }

                // mechanics = await GetAllMechanics(request, queryable, mechanics);

                return new MechanicsEnvelope
                {
                    Mechanics = _mapper.Map<List<Mechanic>, List<MechanicDto>>(mechanics),
                    MechanicCount = queryable.Count()
                };

            }

            private static async Task<List<Mechanic>> GetAllMechanics(Query request, IQueryable<Mechanic> queryable, List<Mechanic> mechanics)
            {
                mechanics = await queryable
                                    .Skip(request.Offset ?? 0)
                                    .Take(request.Limit ?? 3)
                                    .ToListAsync();
                return mechanics;
            }
        }
    }
}