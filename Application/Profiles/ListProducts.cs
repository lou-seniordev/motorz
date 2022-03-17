using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListProducts
    {
          public class Query : IRequest<List<UserProductDto>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserProductDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserProductDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                var queryable = _context.Products
                    .Where(x => x.Seller.Id == user.Id)
                    .OrderBy(a => a.DatePublished)
                     .AsQueryable();
                    
              
                 switch (request.Predicate)
                {
                    case "iSold":
                        queryable = queryable.Where(x => x.IsSold);
                        // queryable = queryable.Where(x => x.Seller.Id == user.Id && x.IsSold);
                        break;
                   
                    case "iAmSelling":
                        queryable = queryable.Where(x => !x.IsSold);
                        // queryable = queryable.Where(x => x.Seller.Id == user.Id && !x.IsSold);
                        break;
                    default:
                        break;
                }

                var products = queryable.ToList();
                var productsToReturn = new List<UserProductDto>();

                foreach (var product in products)
                {
                    var userProduct = new UserProductDto
                    {
                        Id = product.Id,
                        Title = product.Title,
                        Price = product.Price,
                        PictureUrl = product.ProductPhoto.Url,
                        DatePublished = product.DatePublished
                    };

                    productsToReturn.Add(userProduct);
                }

                return productsToReturn;

            }
        }
    }
}