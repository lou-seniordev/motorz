using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string MotorcycleBrandName { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string CountryName { get; set; }
            public string Departure { get; set; }
            public string Destination { get; set; }
            public IFormFile File { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.CountryName).NotEmpty();
                RuleFor(x => x.Departure).NotEmpty();
                RuleFor(x => x.Destination).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IEntityPhotoAccessor _entityPhotoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IEntityPhotoAccessor entityPhotoAccessor)
            {
                _entityPhotoAccessor = entityPhotoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var country = await _context.Countries.SingleOrDefaultAsync(x => x.Name == request.CountryName);

                if (country == null)
                    throw new Exception("Country Not Found");
                var brand = await _context.Brands.SingleOrDefaultAsync(x => x.Name == request.MotorcycleBrandName);

                if (brand == null)
                    throw new Exception("MotorcycleBrandName Not Found");

                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    MotorcycleBrand = brand,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Country = country,
                    Departure = request.Departure,
                    Destination = request.Destination,
                    IsActive = true
                };
                var photoUploadResult = _entityPhotoAccessor.AddPhoto(request.File, 400, 500);

                var photoForActivity = new ActivityPhoto 
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId,
                    ActivityForeignKey = activity.Id
                };

                activity.ActivityPhoto = photoForActivity;

                _context.Activities.Add(activity);

                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var attendee = new UserActivity
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };

                _context.UserActivities.Add(attendee);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}