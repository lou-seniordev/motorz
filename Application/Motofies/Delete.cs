using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Motofies
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMotofyPhotoAccessor _motofyPhotoAccessor;
            public Handler(DataContext context, IMotofyPhotoAccessor motofyPhotoAccessor)
            {
                _motofyPhotoAccessor = motofyPhotoAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var motofy = await _context.Motofies.FindAsync(request.Id);

                if (motofy == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Motofy = "NotFound" });

                var photo = await _context.Motofies.SingleOrDefaultAsync(m => m.Id == motofy.Id);

                // _context.Remove(motofy);

                // var success = await _context.SaveChangesAsync() > 0;


                // if (success) 
                if (true) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}