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
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Website).NotEmpty();
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

                var mechanic = new Mechanic
                {
                    Id = request.Id,
                    Name = request.Name,
                    Publisher = user,
                    Description = request.Description,
                    YearOfStart = request.YearOfStart,
                    DatePublished = DateTime.Now,
                    Country = country,
                    City = request.City,
                    Address = request.Address,
                    Phone = request.Phone,
                    Email = request.Email,
                    Website = request.Website
                };

                _context.Mechanics.Add(mechanic);

                var mechanicId = request.Id;

                var photoUploadResult = _entityPhotoAccessor.AddPhoto(request.File, 400, 500);

                var photoForMechanic = new MechanicPhoto
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId,
                    // DateUploaded = DateTime.Now,
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