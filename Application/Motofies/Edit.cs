using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Motofies
{
    public class Edit
    {
          public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }

            // SHOULD ADD THE OPTION TO CHANGE PHOTO? OR A GALLERY..? BUT NO GALLERY
            // public string PhotoUrl { get; set; }
            public string Description { get; set; }
            public string City { get; set; }
            public string Country { get; set; }
            // public int NumberOfKilometers { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Country).NotEmpty();
                // RuleFor(x => x.NumberOfKilometers).NotEmpty();
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

                motofy.Name = request.Name ?? motofy.Name;
                motofy.Description = request.Description ?? motofy.Description;
                motofy.City = request.City ?? motofy.City;
                motofy.Country = request.Country ?? motofy.Country;
                // motofy.NumberOfKilometers = request.NumberOfKilometers ?? motofy.NumberOfKilometers;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}