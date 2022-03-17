using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Application.Interfaces;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain;
using System.Net;
using Application.Errors;

namespace Application.Products
{
    public class Follow
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

            
                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var product = await _context.Products.SingleOrDefaultAsync(x => x.Id == request.Id);

                 if (product == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { product = "NotFound" });

                var viewer = new ProductViewer 
                {
                    AppUserId = user.Id,
                    ProductId = request.Id,
                    DateStarted = DateTime.Now
                };

                product.NumberFollowed++;
                _context.Products.Update(product);

                _context.ProductViewers.Add(viewer);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}