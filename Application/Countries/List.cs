using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using System.Linq;

namespace Application.Countries
{
    public class List
    {
        public class Query : IRequest<List<CountryToSelectDto>> { }

        public class Handler : IRequestHandler<Query, List<CountryToSelectDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }


            public async Task<List<CountryToSelectDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // === Lazy loading ===
                var countries = await _context.Countries.OrderBy(x => x.Name).ToListAsync();
                // var brandsToReturn = _mapper.Map<List<Brand>, List<Country>>(brands);

                // return brandsToReturn;
                var countriesToReturn = _mapper.Map<List<Country>, List<CountryToSelectDto>>(countries);

                return countriesToReturn;//await _context.Countries.ToListAsync();

            }
        }
    }
}