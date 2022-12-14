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


namespace Application.Motofies
{
    public class List
    {
        public class MotofiesEnvelope
        {
            public List<MotofyDto> Motofies { get; set; }
            public int MotofyCount { get; set; }
            public MotofyDto MostEmbraced { get; set; }
            public MotofyDto HighestRatedMotofy { get; set; }

        }
        public class Query : IRequest<MotofiesEnvelope>
        {
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool BestRated { get; set; }
            public bool MostEmbraced { get; set; }
            public bool IEmbraced { get; set; }
            public string Search { get; set; }
            public bool IFollow { get; set; }

            public Query(int? limit, int? offset, bool bestRated, bool mostEmbraced, bool iEmbraced, bool iFollow, string search)
            {
                IFollow = iFollow;
                Search = search;
                Limit = limit;
                Offset = offset;
                BestRated = bestRated;
                MostEmbraced = mostEmbraced;
                IEmbraced = iEmbraced;
            }

        }

        public class Handler : IRequestHandler<Query, MotofiesEnvelope>
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

            public async Task<MotofiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var motofies = new List<Motofy>();
                var motofiesToQuery = new List<Motofy>();

                var queryable = _context.Motofies.OrderByDescending(x => x.DatePublished).AsQueryable();

                var motos = _context.Motofies.AsQueryable();

                motofiesToQuery = await motos.ToListAsync();

                var user = await _context.Users.SingleOrDefaultAsync(
                  x => x.UserName == _userAccessor.GetCurrentUsername());
                if (!request.BestRated && !request.MostEmbraced
                    && !request.IEmbraced && string.IsNullOrEmpty(request.Search) && !request.IFollow)
                {
                    motofies = await GetListMotofies(request, motofies, queryable);

                }

                //version 1
                var highestRatedMotofy = motofiesToQuery
                .Where(x => x.AverageRating != null)
                .OrderByDescending(x => x.AverageRating.Average)
                .First();

                //version 2
                // var maxAverageRating = motofiesToQuery.Max(x => x.AverageRating.Average);
                // var highestRatedMotofy = motofiesToQuery.First(x => x.AverageRating.Average == maxAverageRating);

                if (request.BestRated)
                {
                    queryable = queryable
                    .OrderByDescending(x => x.AverageRating.Average)
                    .Take(3);
                    motofies = await GetListMotofies(request, motofies, queryable);

                }

                if (request.MostEmbraced)
                {
                    queryable = queryable
                   .OrderByDescending(x => x.TotalEmbraced)
                   .Take(2);
                    motofies = await GetListMotofies(request, motofies, queryable);

                }

                if (request.IEmbraced)
                {
                    queryable = queryable
                    .Where(x => x.UserMotofies
                    .Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && !a.IsOwner));
                    motofies = await GetListMotofies(request, motofies, queryable);

                }

                if (!string.IsNullOrEmpty(request.Search))
                {
                    queryable = queryable
                    .Where(x =>
                        x.Name.Contains(request.Search) ||
                        x.Description.Contains(request.Search) ||
                        x.City.Equals(request.Search) ||
                        x.Model.Equals(request.Search)
                    );
                    motofies = await GetListMotofies(request, motofies, queryable);

                }

                if (request.IFollow)
                {
                    var followings = await _context.Followings
                                    .Where(x => x.ObserverId == user.Id)
                                    .Select(x => x.TargetId)
                                    .ToListAsync();

                    var query = new List<Motofy>();

                    foreach (var id in followings)
                    {
                        var tempQuery = queryable
                            .Where(x => x.Publisher.Id == id);

                        query.AddRange(tempQuery);
                    }
                    motofies = query
                                .Skip(request.Offset ?? 0)
                                .Take(request.Limit ?? 3).ToList();

                }

                var mostEmbracedId = await _context.UserMotofies
                    .GroupBy(m => m.MotofyId)
                    .OrderByDescending(e => e.Count())
                    .Take(1)
                    .Select(g => g.Key)
                    .SingleOrDefaultAsync();

                var motofy = await _context.Motofies.FindAsync(mostEmbracedId);

                return new MotofiesEnvelope
                {
                    Motofies = _mapper.Map<List<Motofy>, List<MotofyDto>>(motofies),
                    MotofyCount = queryable.Count(),
                    MostEmbraced = _mapper.Map<Motofy, MotofyDto>(motofy),
                    HighestRatedMotofy = _mapper.Map<Motofy, MotofyDto>(highestRatedMotofy),
                };
            }

            private static async Task<List<Motofy>> GetListMotofies(Query request, List<Motofy> motofies, IQueryable<Motofy> queryable)
            {
                motofies = await queryable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 4)
                    .ToListAsync();
                return motofies;
            }
        }
    }
}

