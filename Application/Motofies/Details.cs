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
namespace Application.Motofies
{
    public class Details
    {
        public class Query : IRequest<MotofyDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, MotofyDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<MotofyDto> Handle(Query request, CancellationToken cancellationToken)
            {
                // === Eager loading -> this plus virtual keyword ===
                // var motofy = await _context.Motofies
                // .Include(x => x.UserMotofies)
                // .ThenInclude(x => x.AppUser)
                // // cannot use FindAsync() here
                // .SingleOrDefaultAsync(x => x.Id == request.Id);

                //    === Lazy loading ===
                var motofy = await _context.Motofies
                .FindAsync(request.Id);

                if (motofy == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { motofy = "NotFound" });

                var motofyToReturn = _mapper.Map<Motofy, MotofyDto>(motofy);

                return motofyToReturn;
            }
        }
    }
}