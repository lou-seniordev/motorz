using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Motofies
{
    public class List
    {
        public class Query : IRequest<List<MotofyDto>> { }

        public class Handler : IRequestHandler<Query, List<MotofyDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<MotofyDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // === Eager loading -> this plus virtual keyword ===
                // var motofies =
                //     await _context.Motofies
                //         .Include(x => x.Brand)
                //         .ToListAsync();


                // === Lazy loading ===
                var motofies =
                    await _context.Motofies.ToListAsync();

//                return _mapper.Map<List<Activity>, List<ActivityDto>>(activities);
                return _mapper.Map<List<Motofy>, List<MotofyDto>>(motofies);
                // return motofies;
            }

        }
    }
}