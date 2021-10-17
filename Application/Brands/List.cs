using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;


namespace Application.Brands
{
    public class List
    {
        // now I will change this to BrandToSelectDto and extract to interface there
        public class Query : IRequest<List<BrandToSelectDto>> { }

        public class Handler : IRequestHandler<Query, List<BrandToSelectDto>>
        {
            private readonly DataContext _context;
             private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                 _mapper = mapper;
            }


            public async Task<List<BrandToSelectDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // === Eager loading -> this plus virtual keyword ===
                // var brands = 
                //     await _context.Brands
                //     .Include(x => x.Motofies)
                //     .ToListAsync();

                // === Lazy loading ===
                var brands =
                    await _context.Brands.ToListAsync();

                
                var brandsToReturn = _mapper.Map<List<Brand>, List<BrandToSelectDto>>(brands);

                return brandsToReturn;

            }
        }

    }
}