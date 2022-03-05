using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using MediatR;
using Persistence;
using Application.Interfaces;

namespace Application.DiaryEntries
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

                var diaryEntry = await _context.DiaryEntries.FindAsync(request.Id);

                if (diaryEntry == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { diaryEntry = "NotFound" });

                var diaryPhoto = await _context.DiaryPhotos.SingleOrDefaultAsync(m => m.DiaryEntryForeignKey == request.Id);

                var deletePhotoResult = _entityPhotoAccessor.DeletePhoto(diaryPhoto.Id);

                if (deletePhotoResult == null)
                    throw new Exception("Problem deleting photo");

                _context.Remove(diaryEntry);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}