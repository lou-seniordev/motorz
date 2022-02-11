using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Messages
{
    public class MarkRead
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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

                var message = await _context.Messages.SingleOrDefaultAsync(m => m.Id == request.Id);

                message.DateRead = DateTime.Now;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");

            }
        }
    }
}