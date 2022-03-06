using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Motofies
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string BrandName { get; set; }

            public string Description { get; set; }
            public string City { get; set; }
            public string CountryName { get; set; }
            public string NumberOfKilometers { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.BrandName).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.CountryName).NotEmpty();
                RuleFor(x => x.NumberOfKilometers).NotEmpty();
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

                var motofy = await _context.Motofies.FindAsync(request.Id);

                if (motofy == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { activity = "NotFound" });
                        
                var brand = await _context.Brands.SingleOrDefaultAsync(x => x.Name == request.BrandName);

                if (brand == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { brand = "Brand Not Found" });

                var country = await _context.Countries.SingleOrDefaultAsync(x => x.Name == request.CountryName);

                if (country == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { country = "Country Not Found" });

                motofy.Name = request.Name ?? motofy.Name;
                motofy.Brand = brand;
                motofy.Description = request.Description ?? motofy.Description;
                motofy.City = request.City ?? motofy.City;
                motofy.Country = country ?? motofy.Country;
                motofy.NumberOfKilometers = request.NumberOfKilometers ?? motofy.NumberOfKilometers;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}