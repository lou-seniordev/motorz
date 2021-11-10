using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var product = await _context.Products.FindAsync(request.Id);

                if (product == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Product = "Product NotFound" });

                var productPhoto = await _context.Photos.FindAsync(product.ProductPhoto.Id);
                var productPhotoId = productPhoto.Id;

                if (productPhotoId == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Product Photo NotFound" });

                var deletePhotoResult = _photoAccessor.DeletePhoto(productPhotoId); 

                if (deletePhotoResult == null)
                    throw new Exception("Problem deleting photo");

                _context.Remove(productPhoto);
                _context.Remove(product);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}

                        