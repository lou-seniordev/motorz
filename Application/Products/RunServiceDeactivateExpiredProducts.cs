using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.Extensions.Logging;
using System.Linq;
using Application.Errors;
using System.Net;

namespace Application.Products
{
    public class RunServiceDeactivateExpiredProducts
    {
           public class Command : IRequest
        {
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly ILogger<RunServiceDeleteInactiveProducts> _logger;
            public Handler(DataContext context, ILogger<RunServiceDeleteInactiveProducts> logger)
            {
                _logger = logger;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var products = await _context.Products
                    .Where(x => DateTime.Compare(x.InactivityExpirationDate, DateTime.Now) < 0)
                    .ToListAsync();

                if (products == null)
                    _logger.LogInformation("None of the Products are to be dectivated");
              
                foreach (var product in products)
                {
                    product.IsActive = false;
                    _context.Update(product);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}