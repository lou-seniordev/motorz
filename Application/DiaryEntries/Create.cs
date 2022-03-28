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

namespace Application.DiaryEntries
{
    public class Create
    {
        public class Command : IRequest
        {
            

            public Guid Id { get; set; }
            public Guid ActivityId { get; set; }
            public string Body { get; set; }
            public string Mood { get; set; }
            public string Weather { get; set; }
            public string Road { get; set; }
            public string NumberOfKilometers { get; set; }
            public IFormFile File { get; set; }
            public string LocationCity { get; set; }
            public string LocationCountry { get; set; }
           

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.ActivityId).NotEmpty();
                RuleFor(x => x.Body).NotEmpty();
                RuleFor(x => x.Mood).NotEmpty();
                RuleFor(x => x.Weather).NotEmpty();
                RuleFor(x => x.Road).NotEmpty();
                RuleFor(x => x.NumberOfKilometers).NotEmpty();
                RuleFor(x => x.File).NotEmpty();
                RuleFor(x => x.LocationCity).NotEmpty();
                RuleFor(x => x.LocationCountry).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            private readonly IEntityPhotoAccessor _entityPhotoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, 
                IEntityPhotoAccessor entityPhotoAccessor)
            {
                _entityPhotoAccessor = entityPhotoAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var country = await _context.Countries.SingleOrDefaultAsync(x => x.Name == request.LocationCountry);
                if (country == null)
                    throw new Exception("Country Not Found");

                var activity = await _context.Activities.SingleOrDefaultAsync(x => x.Id == request.ActivityId);
                if (activity == null)
                    throw new Exception("Activity Not Found");

                // var diaryEntryId = new Guid();

                var diaryEntry = new DiaryEntry
                {
                    Id = request.Id,
                    DayNumber = activity.DiaryEntries.Count + 1,
                    Body = request.Body,
                    Mood = request.Mood,
                    EntryDate = DateTime.Now,
                    Weather = request.Weather,
                    Road = request.Road,
                    NumberOfKilometers = Int32.Parse(request.NumberOfKilometers),
                    LocationCity = request.LocationCity,
                    LocationCountry = country.Name,
                    Activity = activity
                };

                _context.DiaryEntries.Add(diaryEntry);
                

                var photoUploadResult = _entityPhotoAccessor.AddPhoto(request.File, 400, 500);

                var diaryPhoto = new DiaryPhoto
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId,
                    DateUploaded = DateTime.Now,
                    DiaryEntryForeignKey = request.Id
                };

                diaryEntry.DiaryPhoto = diaryPhoto;
                activity.IsActive = true;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}