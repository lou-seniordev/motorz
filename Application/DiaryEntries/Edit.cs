using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.DiaryEntries
{
    public class Edit
    {
         public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Body { get; set; }
            public string Mood { get; set; }
            public string Weather { get; set; }
            public string Road { get; set; }
            public string NumberOfKilometers { get; set; }
            public string LocationCity { get; set; }
            public string LocationCountry { get; set; }
        }

         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Body).NotEmpty();
                RuleFor(x => x.Mood).NotEmpty();
                RuleFor(x => x.Weather).NotEmpty();
                RuleFor(x => x.Road).NotEmpty();
                RuleFor(x => x.NumberOfKilometers).NotEmpty();
                RuleFor(x => x.LocationCity).NotEmpty();
                RuleFor(x => x.LocationCountry).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var diaryEntry = await _context.DiaryEntries.FindAsync(request.Id);

                if(diaryEntry == null) 
                    throw new RestException(HttpStatusCode.NotFound, 
                        new {diaryEntry = "NotFound"});

                // int NumberOfKilometers = Int32.Parse(request.NumberOfKilometers);
                
                diaryEntry.Body = request.Body ?? diaryEntry.Body;
                diaryEntry.Mood = request.Mood ?? diaryEntry.Mood;
                diaryEntry.Weather = request.Weather ?? diaryEntry.Weather;
                diaryEntry.Road = request.Road ?? diaryEntry.Road;
                diaryEntry.LocationCity = request.LocationCity ?? diaryEntry.LocationCity;
                diaryEntry.LocationCountry = request.LocationCountry ?? diaryEntry.LocationCountry;
               
                if(request.NumberOfKilometers != null)
                {
                    diaryEntry.NumberOfKilometers = Int32.Parse(request.NumberOfKilometers);
                }
              
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}