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

namespace Application.Products
{
    public class Details
    {
        public class Query : IRequest<Product>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Product>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Product> Handle(Query request, CancellationToken cancellationToken)
            {

                // === Lazy loading ===
                var product = await _context.Products
                .FindAsync(request.Id);

                if (product == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { activity = "NotFound" });

                return product;
                
            }
        }
    }
}

