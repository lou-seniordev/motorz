using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Mechanics
{
    public class List
    {
        public class Query : IRequest<List<Mechanic>> { }

        public class Handler : IRequestHandler<Query, List<Mechanic>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<Mechanic>> Handle(Query request, CancellationToken cancellationToken)
            {
                // === Lazy loading ===
                var mechanics = await _context.Mechanics.ToListAsync();

                return mechanics;
            }


        }
    }
}