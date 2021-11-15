using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Application.Products
{
    public class Create
    {
        public class Command : IRequest
        {
            //==MUSTDO - VALIDATION
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Price { get; set; }
            public string Model { get; set; }
            public string PictureUrl { get; set; }
            public string Brand { get; set; }
            public string Category { get; set; }
            public IFormFile File { get; set; }
            public bool IsActive { get; set; }
            public bool IsAdvertised { get; set; }
            public DateTime DatePublished { get; set; }
            public DateTime DateActivated { get; set; }
            public DateTime DateAdvertised { get; set; }
            public int ActivationCounter { get; set; }


        }

        public class CommandValidator : AbstractValidator<Command>
        {
                public CommandValidator()
                {
                    RuleFor(x => x.Id).NotEmpty();
                    RuleFor(x => x.Model).NotEmpty();
                    // RuleFor(x => x.BrandName).NotEmpty();
                    // RuleFor(x => x.Name).NotEmpty();
                    // // RuleFor(x => x.CubicCentimeters).NotEmpty();
                    // // RuleFor(x => x.File).NotEmpty();
                    // // RuleFor(x => x.Description).NotEmpty();
                    // // RuleFor(x => x.YearOfProduction).NotEmpty();
                    // // // RuleFor(x => x.BrandId).NotEmpty();
                    // // // RuleFor(x => x.DatePublished).NotEmpty();
                    // // RuleFor(x => x.City).NotEmpty();
                    // // RuleFor(x => x.Country).NotEmpty();
                    // // RuleFor(x => x.PricePaid).NotEmpty();
                    // // RuleFor(x => x.EstimatedValue).NotEmpty();
                    // // RuleFor(x => x.NumberOfKilometers).NotEmpty();
                }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {


                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());


                var product = new Product
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Model = request.Model,
                    Price = request.Price,
                    PictureUrl = request.PictureUrl,
                    Brand = request.Brand,
                    Category = request.Category,
                    IsActive = true,
                    IsAdvertised = false,
                    DatePublished = DateTime.Now,
                    DateActivated = DateTime.Now,
                    ActivationCounter = 1,
                };





                var ProductId = product.Id;

                var photoUploadResult = _photoAccessor.AddPhoto(request.File);

                var photoForProduct = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId,
                };

                product.ProductPhoto = photoForProduct;

                user.Products.Add(product);

                _context.Products.Add(product);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                // return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}