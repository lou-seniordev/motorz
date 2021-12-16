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
            private readonly IEntityPhotoAccessor _entityPhotoAccessor;
            public Handler(DataContext context, IEntityPhotoAccessor entityPhotoAccessor)
            {
                _entityPhotoAccessor = entityPhotoAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var motofy = await _context.Motofies.FindAsync(request.Id);
                var motofyPhoto = await _context.MotofyPhotos.SingleOrDefaultAsync(m => m.MotofyForeignKey == motofy.Id);

                if (motofy == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Motofy = "Motofy NotFound" });

                if (motofyPhoto == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Motofy = "Motofy Photo NotFound" });

                var deletePhotoResult = _entityPhotoAccessor.DeletePhoto(motofyPhoto.Id); 

                
                if (deletePhotoResult == null)
                    throw new Exception("Problem deleting photo");


                // var photo = await _context.Motofies.SingleOrDefaultAsync(m => m.Id == motofy.Id);
                // var photoId = await _context.MotofyPhotos.SingleOrDefaultAsync(m => m.Id == mo);

                _context.Remove(motofy);

                var success = await _context.SaveChangesAsync() > 0;


                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}