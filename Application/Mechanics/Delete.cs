using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Mechanics
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
            private readonly IEntityPhotoAccessor _entityPhotoAccessor;

            public Handler(DataContext context, IEntityPhotoAccessor entityPhotoAccessor)
            {
                _context = context;
                _entityPhotoAccessor = entityPhotoAccessor;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var mechanic = await _context.Mechanics.FindAsync(request.Id);
                if (mechanic == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Mechanic = "NotFound" });
                var mechanicPhoto = await _context.MechanicPhotos.SingleOrDefaultAsync(
                    x => x.MechanicForeignKey == mechanic.Id);
                if (mechanicPhoto == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { MechanicPhoto = "NotFound" });

                var deletePhotoResult = _entityPhotoAccessor.DeletePhoto(mechanicPhoto.Id);

                if (deletePhotoResult == null)
                    throw new Exception("Problem deleting photo");

                _context.Remove(mechanic);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}