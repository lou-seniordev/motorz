using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Text.Json;
using System.Linq;

namespace Application.Mechanics
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Owner { get; set; }
            public string Description { get; set; }
            public string YearOfStart { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string Address { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
            public string Website { get; set; }
            public string Testimonial { get; set; }
            public string IsOwner { get; set; }
            public string IsCustomer { get; set; }
            public string CustomerRecommended { get; set; }
            public string MechanicBrands { get; set; }
            public IFormFile File { get; set; }

        }
        #region 
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.YearOfStart).NotEmpty();
                RuleFor(x => x.Country).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Address).NotEmpty();
                RuleFor(x => x.Phone).NotEmpty();
                RuleFor(x => x.File).NotEmpty();
            }
        }
        #endregion
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly IEntityPhotoAccessor _entityPhotoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper, IEntityPhotoAccessor entityPhotoAccessor)
            {
                _entityPhotoAccessor = entityPhotoAccessor;
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());
                var country = await _context.Countries.SingleOrDefaultAsync(x => x.Name == request.Country);

                var owner = request.Owner == "Customer" ? request.Name : user.DisplayName;
                
                var testimonial = new Testimonial
                {
                    Id = new Guid(),
                    Text = request.Testimonial,
                    DateAdded = DateTime.Now
                };


                var brandQuery = request.MechanicBrands.Split(',').ToList();

                var mechanicBrands = new List<MechanicBrand>();
                foreach(var brand in brandQuery)
                {
                    var newBrand = await _context.Brands.SingleOrDefaultAsync(b => b.Name == brand);
                    var mechanicBrand = new MechanicBrand
                    {
                        BrandId = newBrand.Id,
                        MechanicId = request.Id,
                        DateAdded = DateTime.Now
                    };
                    mechanicBrands.Add(mechanicBrand);
                }

                var mechanic = new Mechanic
                {
                    Id = request.Id,
                    Name = request.Name,
                    Publisher = user,
                    Owner = owner,
                    Description = request.Description,
                    YearOfStart = request.YearOfStart,
                    DatePublished = DateTime.Now,
                    Country = country,
                    City = request.City,
                    Address = request.Address,
                    Phone = request.Phone,
                    Email = request.Email,
                    Website = request.Website,
                    Customers = new List<UserMechanic>
                    {
                        new UserMechanic
                        {
                            AppUserId = user.Id,
                            MechanicId = request.Id,
                            DateBecameCustomer = DateTime.Now,
                            Testimonial = testimonial,
                            IsOwner = bool.Parse(request.IsOwner),
                            IsCustomer = bool.Parse(request.IsCustomer),
                            CustomerRecommended = bool.Parse(request.CustomerRecommended),
                        }
                    },
                    Brands = mechanicBrands

                };

                _context.Mechanics.Add(mechanic);

                var mechanicId = request.Id;

                var photoUploadResult = _entityPhotoAccessor.AddPhoto(request.File, 400, 500);

                var photoForMechanic = new MechanicPhoto
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId,
                    MechanicForeignKey = mechanicId
                };

                mechanic.MechanicPhoto = photoForMechanic;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}