using System.Collections.Generic;
using System.Linq;
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
        public class MechanicsEnvelope
        {
            public List<MechanicDto> Mechanics { get; set; }
            public int MechanicCount { get; set; }
            // public MechanicDto MostEmbraced { get; set; }
            public MechanicDto HighestRatedMechanic { get; set; }
            //maybe should count embraced???
            // public List<MotofyDto> MostEmbracedList { get; set; }
            // public List<Guid> MostEmbracedList { get; set; }
        }
        public class Query : IRequest<MechanicsEnvelope> { 

        public Query(int? limit, int? offset) 
        {
            Limit = limit;
            Offset = offset;
   
        }
            public int? Limit { get; set; }
            public int? Offset { get; set; }

        }

        public class Handler : IRequestHandler<Query, MechanicsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<MechanicsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Mechanics.AsQueryable();
               
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