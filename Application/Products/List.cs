using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class List
    {
        public class ProductsEnvelope
        {
            public List<ProductDto> Products { get; set; }
            public int ProductCount { get; set; }
        }
        public class Query : IRequest<ProductsEnvelope>
        {
            public Query(int? limit, int? offset, string country, string brand, string category, string search)
            {
                Limit = limit;
                Offset = offset;
                Country = country;
                Brand = brand;
                Category = category;
                Search = search;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public string Brand { get; set; }
            public string Category { get; set; }
            public string Country { get; set; }
            public string Search { get; set; }
            //==TODO--
            public string PriceRange { get; set; }

        }

        public class Handler : IRequestHandler<Query, ProductsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ProductsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Products.AsQueryable();

                if (!string.IsNullOrEmpty(request.Category))
                {
                    queryable = queryable.Where(x => x.Category == request.Category);
                }

                if (!string.IsNullOrEmpty(request.Brand))
                {
                    queryable = queryable.Where(x => x.Brand == request.Brand);
                }

                if (!string.IsNullOrEmpty(request.Country))
                {
                    queryable = queryable.Where(x => x.Country.Name == request.Country);
                }

                 if (!string.IsNullOrEmpty(request.Search))
                {
                    queryable = queryable
                    .Where(x =>
                        x.Title.Contains(request.Search) ||
                        x.Description.Contains(request.Search) ||
                        x.City.Equals(request.Search) ||
                        x.Brand.Equals(request.Search) ||
                        x.Model.Contains(request.Search) 
                    );
                }

                var products = await queryable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3)
                    .ToListAsync();


                return new ProductsEnvelope
                {
                    Products = _mapper.Map<List<Product>, List<ProductDto>>(products),
                    ProductCount = queryable.Count()
                };

            }
        }
    }
}