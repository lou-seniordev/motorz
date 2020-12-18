using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Mechanics
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            // public string PhotoUrl { get; set; }
            public string Description { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string Address { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Country).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Address).NotEmpty();
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

                var mechanic = await _context.Mechanics.FindAsync(request.Id);

                if (mechanic == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { activity = "NotFound" });

                mechanic.Name = request.Name ?? mechanic.Name;
                mechanic.Description = request.Description ?? mechanic.Description;
                mechanic.Country = request.Country ?? mechanic.Country;
                mechanic.City = request.City ?? mechanic.City;
                mechanic.Address = request.Address ?? mechanic.Address;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}