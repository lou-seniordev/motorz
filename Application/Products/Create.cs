using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
// using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Http;
// using Application.MotofyPhotos;

namespace Application.Products
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Price { get; set; }
            public string Model { get; set; }
            public string PictureUrl { get; set; }
            public string Brand { get; set; }
            public string Category { get; set; }
            public bool IsActive { get; set; }
            public bool IsAdvertised { get; set; }
            public IFormFile File { get; set; }
            public string YearOfProduction { get; set; }
            public DateTime DatePublished { get; set; }
            public DateTime DateActivated { get; set; }
            public DateTime DateAdvertised { get; set; }
            // public string City { get; set; }
            // public string Country { get; set; }
            // public string EstimatedValue { get; set; }
            // public string NumberOfKilometers { get; set; }


            // public Guid Id { get; set; }
            //         public string Title { get; set; }
            //         public string Model { get; set; }
            //         public string Description { get; set; }
            //         public long Price { get; set; }
            //         public string PictureUrl { get; set; }
            //         public string Brand { get; set; }
            //         public string Category { get; set; }
            //         // public int QuantityInStock { get; set; }
            //         public bool IsActive { get; set; }
            //         public bool IsAdvertised { get; set; }
            //         // public bool IsSent { get; set; }
            //         public DateTime DatePublished { get; set; }
            //         public DateTime DateActivated { get; set; }
            //         public DateTime DateAdvertised { get; set; }
            //         public int ActivationCounter { get; set; }
            //         public virtual Photo ProductPhoto { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            //     public CommandValidator()
            //     {
            //         RuleFor(x => x.Id).NotEmpty();
            //         RuleFor(x => x.BrandName).NotEmpty();
            //         RuleFor(x => x.Name).NotEmpty();
            //         RuleFor(x => x.Model).NotEmpty();
            //         // RuleFor(x => x.CubicCentimeters).NotEmpty();
            //         // RuleFor(x => x.File).NotEmpty();
            //         // RuleFor(x => x.Description).NotEmpty();
            //         // RuleFor(x => x.YearOfProduction).NotEmpty();
            //         // // RuleFor(x => x.BrandId).NotEmpty();
            //         // // RuleFor(x => x.DatePublished).NotEmpty();
            //         // RuleFor(x => x.City).NotEmpty();
            //         // RuleFor(x => x.Country).NotEmpty();
            //         // RuleFor(x => x.PricePaid).NotEmpty();
            //         // RuleFor(x => x.EstimatedValue).NotEmpty();
            //         // RuleFor(x => x.NumberOfKilometers).NotEmpty();
            //     }
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


                //NEW
                // var brand = await _context.Brands.FindAsync(request.BrandId);
                // var brand = await _context.Brands.SingleOrDefaultAsync(x => x.Name == request.BrandName); 


                var motofy = new Motofy
                {
                    // Id = request.Id,
                    // Name = request.Name,
                    // Brand = brand,
                    // Model = request.Model,
                    // CubicCentimeters = request.CubicCentimeters,
                    // // PhotoUrl = request.PhotoUrl,
                    // Description = request.Description,
                    // YearOfProduction = request.YearOfProduction,
                    // NumberOfKilometers = request.NumberOfKilometers,
                    // City = request.City,
                    // Country = request.Country,
                    // PricePaid = request.PricePaid,
                    // EstimatedValue = request.EstimatedValue,
                    // DatePublished = request.DatePublished
                };

                // === still not sure what will it be ===
                var embracer = new UserMotofy
                {
                    AppUser = user,
                    Motofy = motofy,
                    IsOwner = true,
                    DateEmbraced = DateTime.Now
                };
                _context.UserMotofies.Add(embracer);

                _context.Motofies.Add(motofy);

                var MotorfyId = motofy.Id;
                var photoUploadResult = _photoAccessor.AddPhoto(request.File);
                var motofyForPhoto = await _context.Motofies.SingleOrDefaultAsync(m => m.Id == MotorfyId);
                var photoForMotofy = new MotofyPhoto
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId,
                    DateUploaded = DateTime.Now,
                    MotofyForeignKey = MotorfyId
                };

                motofy.MotofyPhoto = photoForMotofy;

                // var success = await _context.SaveChangesAsync() > 0;

                // if (success) return Unit.Value;

                return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}