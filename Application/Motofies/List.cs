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
            //maybe should count embraced???
            // public List<MotofyDto> MostEmbracedList { get; set; }
            // public List<Guid> MostEmbracedList { get; set; }
        }
        public class Query : IRequest<MotofiesEnvelope>
        {
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IEmbraced { get; set; }
            public bool IOwn { get; set; }

            public bool WinningFive { get; set; }

            public Query(int? limit, int? offset, bool iEmbraced, bool iOwn, bool winningFive)
            {
                Limit = limit;
                Offset = offset;
                IEmbraced = iEmbraced;
                IOwn = iOwn;
                WinningFive = winningFive;
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
                var queryable = _context.Motofies.OrderBy(x => x.DatePublished).AsQueryable();

                if (request.IOwn)
                {
                    queryable = queryable
                    .Where(x => x.UserMotofies
                    .Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsOwner));
                }

                if (request.IEmbraced)
                {
                    queryable = queryable
                    .Where(x => x.UserMotofies
                    .Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && !a.IsOwner));
                }

                if (request.WinningFive == true)
                {
                    var mostEmbracedIds = await _context.UserMotofies
                    .GroupBy(m => m.MotofyId)
                    .OrderByDescending(e => e.Count())
                    .Take(3)
                    .Select(g => g.Key)
                    .ToListAsync();
                    var mostEmbracedMotofies = new List<Motofy>();

                    foreach (var motofyId in mostEmbracedIds)
                    {
                        var motofyToAdd = await _context.Motofies.FindAsync(motofyId);
                        motofies.Add(motofyToAdd);
                    }
                }
                else
                {
                    motofies = await queryable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3)
                    .ToListAsync();
                }

                // // == MostEmbracedOne ==
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
                };
            }
        }
    }
}


// .ToListAsync();

// var winnQuery = _context.Motofies.AsQueryable();
// var mostEmbraced = await winnQuery.SingleOrDefaultAsync(e => e.Id == mostEmbracedId);
// === or better ===

// MostEmbraced = _mapper.Map<Motofy, MotofyDto>(mostEmbraced)
// MostEmbraced = _mapper.Map<Motofy, MotofyDto>(motofy),
// MostEmbracedList = _mapper.Map<List<Motofy>, List<MotofyDto>>(mostEmbracedMotofies)



// // == MostEmbracedList ==
// if (request.WinningFive)
// {
//     var mostEmbracedIds = await _context.UserMotofies
//                  .GroupBy(m => m.MotofyId)
//                  .OrderByDescending(e => e.Count())
//                  .Take(4)
//                  .Select(g => g.Key)
//                  .ToListAsync();
//     var mostEmbracedMotofies = new List<Motofy>();

//     foreach (var motofyId in mostEmbracedIds)
//     {
//         var motofyToAdd = await _context.Motofies.FindAsync(motofyId);
//         motofies.Add(motofyToAdd);
//     }
// }



// if (request.IOwn)
// {
//     queryable = queryable.Where(x => x.UserMotofies.Any
//         (a => a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsOwner && !request.IEmbraced));
// }


// var mostEmbraced = await _context.Motofies.AsQueryable()
// .GroupBy(i => i)
// .OrderByDescending(g => g.Count())
// .Take(1)
// .Select(g => g.Key);

// // var winner = _context.Motofies.AsQueryable();
// var top = _context.Motofies.
// .GroupBy(i => i)
// .OrderByDescending(g => g.Count())
// .Take(1)
// .Select(g => g.Key);