using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string MotorcycleBrandName { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string CountryName { get; set; }
            public string Departure { get; set; }
            public string Destination { get; set; }


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
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { activity = "NotFound" });
                var country = await _context.Countries.SingleOrDefaultAsync(x => x.Name == request.CountryName);

                if (country == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { country = "Country Not Found" });

                var motorcycleBrandName = await _context.Brands.SingleOrDefaultAsync(x => x.Name == request.MotorcycleBrandName);

                if (motorcycleBrandName == null)
                    throw new Exception("MotorcycleBrandName Not Found");


                activity.Title = request.Title ?? activity.Title;
                activity.MotorcycleBrand = motorcycleBrandName ?? activity.MotorcycleBrand;
                activity.Description = request.Description ?? activity.Description;
                activity.Category = request.Category ?? activity.Category;
                activity.Date = request.Date ?? activity.Date;
                activity.City = request.City ?? activity.City;
                activity.Country = country ?? activity.Country;
                activity.Departure = request.Departure ?? activity.Departure;
                activity.Destination = request.Destination ?? activity.Destination;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}