using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.Extensions.Logging;
using System.Linq;
using Application.Errors;
using System.Net;

namespace Application.Products
{
    public class RunServiceDeleteInactiveProducts
    {
        public class Command : IRequest
        {
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IEntityPhotoAccessor _entityPhotoAccessor;
            private readonly ILogger<RunServiceDeleteInactiveProducts> _logger;
            public Handler(DataContext context, IEntityPhotoAccessor entityPhotoAccessor, ILogger<RunServiceDeleteInactiveProducts> logger)
            {
                _logger = logger;
                _entityPhotoAccessor = entityPhotoAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var products = await _context.Products
                    .Where(x => x.IsActive == false)
                    .ToListAsync();

                if (products == null)
                    _logger.LogInformation("All Products Are Active");


                foreach (var product in products)

                {

                    var productPhoto = await _context.ProductPhotos
                        .SingleOrDefaultAsync(x => x.ProductForeignKey == product.Id);
                    if (productPhoto == null)
                        throw new RestException(HttpStatusCode.NotFound, new { Photo = "Product Photo NotFound" });
                    var deletePhotoResult = _entityPhotoAccessor.DeletePhoto(productPhoto.Id);
                    if (deletePhotoResult == null)
                        throw new Exception("Problem deleting photo");
                    _context.Remove(product);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}