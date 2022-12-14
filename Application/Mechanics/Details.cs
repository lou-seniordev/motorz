using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Mechanics
{
    public class Details
    {
          public class Query : IRequest<MechanicDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, MechanicDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<MechanicDto> Handle(Query request, CancellationToken cancellationToken)
            {
                // === Eager loading -> this plus virtual keyword ===
                // var activity = await _context.Activities
                // .Include(x => x.UserActivities)
                // .ThenInclude(x => x.AppUser)
                // .SingleOrDefaultAsync(x => x.Id == request.Id);
               
               // === Lazy loading ===
                var mechanic = await _context.Mechanics
                .FindAsync(request.Id);

                if (mechanic == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { mechanic = "NotFound" });

              
                return _mapper.Map<Mechanic, MechanicDto>(mechanic);
            }
        }
    }
}