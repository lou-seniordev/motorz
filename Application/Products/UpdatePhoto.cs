using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Products
{
    public class UpdatePhoto
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public IFormFile File { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.File).NotEmpty();
            }
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
                    throw new RestException(HttpStatusCode.NotFound,
                        new { activity = "NotFound" });
                
                //==ADD NEW==
                var newPhotoUploadResult = _photoAccessor.AddPhoto(request.File);

                var newPhoto = new ProductPhoto
                {
                    Url = newPhotoUploadResult.Url,
                    Id = newPhotoUploadResult.PublicId,
                };

                //==DELETE== 
                var productPhotoToDelete = await _context.Photos.FindAsync(product.ProductPhoto.Id);
                var productPhotoId = productPhotoToDelete.Id;

                if (productPhotoId == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Product Photo NotFound" });

                var deletePhotoResult = _photoAccessor.DeletePhoto(productPhotoId); 

                if (deletePhotoResult == null)
                    throw new Exception("Problem deleting photo");

                //==OVERWRITE==
                product.ProductPhoto = newPhoto;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}
                // motofy.Name = request.Name ?? motofy.Name;