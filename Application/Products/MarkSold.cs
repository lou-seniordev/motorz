using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Application.Interfaces;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Net;
using Application.Errors;



namespace Application.Products
{
    public class MarkSold
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;


            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {


                var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (product == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { product = "NotFound" });

                product.IsSold = true;

                _context.Products.Update(product);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}