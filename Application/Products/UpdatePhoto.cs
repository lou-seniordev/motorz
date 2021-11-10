using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Products
{
    public class UpdatePhoto
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
           
            public IFormFile File { get; set; }
            
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.File).NotEmpty();
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

                var product = await _context.Products.FindAsync(request.Id);

                if (product == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { activity = "NotFound" });

                // motofy.Name = request.Name ?? motofy.Name;
                // motofy.Description = request.Description ?? motofy.Description;
                // motofy.City = request.City ?? motofy.City;
                // motofy.Country = request.Country ?? motofy.Country;
                // motofy.NumberOfKilometers = request.NumberOfKilometers ?? motofy.NumberOfKilometers;

               

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}