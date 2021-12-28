using System;
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
            //maybe should count embraced???
            // public List<MotofyDto> MostEmbracedList { get; set; }
            // public List<Guid> MostEmbracedList { get; set; }
        }
        public class Query : IRequest<MotofiesEnvelope>
        {
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            // public bool IEmbraced { get; set; }
            // public bool IOwn { get; set; }
            // public bool WinningFive { get; set; }

            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;

            }
            // public Query(int? limit, int? offset, bool iEmbraced, bool iOwn, bool winningFive)
            // {
            //     Limit = limit;
            //     Offset = offset;
            //     IEmbraced = iEmbraced;
            //     IOwn = iOwn;
            //     WinningFive = winningFive;
            // }


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

                var queryable = _context.Motofies.OrderBy(x => x.DatePublished).AsQueryable();

                var motos = _context.Motofies.AsQueryable();

                motofiesToQuery = await motos.ToListAsync();

                int count = 0;
                double sum = 0;
                double result = 0;

                foreach (var moto in motofiesToQuery)
                {
                    foreach (var score in moto.MotofyScores)
                    {
                        sum += score.Score;
                        count++;
                    }
                    result = sum / count;
                  
                    moto.AverageRating = new AverageRating
                    {
                        Id = new Guid(),
                        Count = count,
                        Average = Math.Round(result, 2)
                    };
                    _context.Motofies.Update(moto);
                   
                    count = 0;
                    sum = 0;
                    result = 0;
                    
                }

                //version 1
                // var highestRatedMotofy = motofiesToQuery.OrderByDescending(x => x.AverageRating.Average).First();

                //version 2
                var maxAverageRating = motofiesToQuery.Max(x => x.AverageRating.Average);
                var highestRatedMotofy = motofiesToQuery.First(x => x.AverageRating.Average == maxAverageRating);

                //====What if there are more of the same average Rating???====
                //====Possible solution -- put in in the list and check on UI whether show list or single====

                // if (request.IOwn)
                // {
                //     queryable = queryable
                //     .Where(x => x.UserMotofies
                //     .Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsOwner));
                // }

                // if (request.IEmbraced)
                // {
                //     queryable = queryable
                //     .Where(x => x.UserMotofies
                //     .Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && !a.IsOwner));
                // }

                // if (request.WinningFive == true)
                // {
                //     var mostEmbracedIds = await _context.UserMotofies
                //     .GroupBy(m => m.MotofyId)
                //     .OrderByDescending(e => e.Count())
                //     .Take(3)
                //     .Select(g => g.Key)
                //     .ToListAsync();
                //     var mostEmbracedMotofies = new List<Motofy>();

                //     foreach (var motofyId in mostEmbracedIds)
                //     {
                //         var motofyToAdd = await _context.Motofies.FindAsync(motofyId);
                //         motofies.Add(motofyToAdd);
                //     }
                // }
                // else
                // {
                motofies = await queryable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3)
                .ToListAsync();
                // }

                // // == MostEmbracedOne ==
                var mostEmbracedId = await _context.UserMotofies
                                .GroupBy(m => m.MotofyId)
                                .OrderByDescending(e => e.Count())
                                .Take(1)
                                .Select(g => g.Key)
                                .SingleOrDefaultAsync();


                var motofy = await _context.Motofies.FindAsync(mostEmbracedId);

                // var winnerId = await _context.Motofies




                return new MotofiesEnvelope
                {
                    Motofies = _mapper.Map<List<Motofy>, List<MotofyDto>>(motofies),
                    MotofyCount = queryable.Count(),
                    MostEmbraced = _mapper.Map<Motofy, MotofyDto>(motofy),
                    HighestRatedMotofy = _mapper.Map<Motofy, MotofyDto>(highestRatedMotofy),
                };
            }
        }
    }
}

