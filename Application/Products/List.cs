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
            public Query(int? limit, int? offset, string country, string brand,
                string category, bool iFollow, bool iView, string search)
            {
                IFollow = iFollow;
                IView = iView;
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
            public bool IFollow { get; set; }
            public bool IView { get; set; }
            public string Search { get; set; }
            //==TODO--
            public string PriceRange { get; set; }

        }

        public class Handler : IRequestHandler<Query, ProductsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;

            }

            public async Task<ProductsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(
                  x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable = _context.Products
                //!! work on sold/active combination
                // .Where(x => x.IsActive)
                .OrderByDescending(x => x.DatePublished)
                .AsQueryable();

                var products = new List<Product>();

                if (string.IsNullOrEmpty(request.Country) && string.IsNullOrEmpty(request.Category)
                    && string.IsNullOrEmpty(request.Brand) && string.IsNullOrEmpty(request.Search)
                    && !request.IFollow && !request.IView)
                {
                    products = await GetAllProducts(request, queryable, products);

                }

                if (!string.IsNullOrEmpty(request.Category))
                {
                    queryable = queryable.Where(x => x.Category == request.Category);
                    products = await GetAllProducts(request, queryable, products);

                }

                if (!string.IsNullOrEmpty(request.Brand))
                {
                    queryable = queryable.Where(x => x.Brand == request.Brand);
                    products = await GetAllProducts(request, queryable, products);

                }

                if (!string.IsNullOrEmpty(request.Country))
                {
                    queryable = queryable.Where(x => x.Country.Name == request.Country);
                    products = await GetAllProducts(request, queryable, products);

                }

                if (!string.IsNullOrEmpty(request.Search))
                {
                    var search = char.ToUpper(request.Search[0]) + request.Search.Substring(1);
                    queryable = queryable
                    .Where(x =>
                        x.Title.Contains(request.Search) || x.Title.Contains(search) ||
                        x.Description.Contains(request.Search) ||
                        x.City.Equals(request.Search) || x.City.Contains(search) ||
                        x.Brand.Equals(request.Search) ||
                        x.Model.Contains(request.Search) || x.Model.Contains(search)
                    );
                    products = await GetAllProducts(request, queryable, products);

                }
                if (request.IFollow)
                {
                    var followings = await _context.Followings
                                   .Where(x => x.ObserverId == user.Id)
                                   .Select(x => x.TargetId)
                                   .ToListAsync();

                    var query = new List<Product>();

                    foreach (var id in followings)
                    {
                        var tempQuery = queryable
                            .Where(x => x.Seller.Id == id);

                        query.AddRange(tempQuery);
                    }
                    products = query
                                .Skip(request.Offset ?? 0)
                                .Take(request.Limit ?? 3).ToList();
                    queryable = queryable.Where(x => x.Seller.Id == user.Id);

                }
                if (request.IView)
                {
                    queryable = queryable.Where(x => x.Viewers.Any(x => x.AppUserId == user.Id));
                    products = await GetAllProducts(request, queryable, products);

                }


                return new ProductsEnvelope
                {
                    Products = _mapper.Map<List<Product>, List<ProductDto>>(products),
                    ProductCount = queryable.Count()
                };

            }

            private static async Task<List<Product>> GetAllProducts(Query request, IQueryable<Product> queryable, List<Product> products)
            {
                products = await queryable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3)
                    .ToListAsync();
                return products;
            }
        }
    }
}