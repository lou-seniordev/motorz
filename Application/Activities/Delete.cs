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

namespace Application.Activities
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

                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { activity = "NotFound" });

                var diaryEntries = await _context.DiaryEntries
                .Where(x => x.Activity.Id == activity.Id)
                .ToListAsync();

                foreach (var entry in diaryEntries)
                {
                    var diaryPhoto = await _context.DiaryPhotos
                    .SingleOrDefaultAsync(x => x.DiaryEntryForeignKey == entry.Id);

                    var deletePhotoResult = _entityPhotoAccessor.DeletePhoto(diaryPhoto.Id);

                    if (deletePhotoResult == null)
                         throw new Exception("Problem deleting photo");

                }


                _context.RemoveRange(diaryEntries);

                var comments = await _context.Comments
                .Where(x => x.Activity.Id == activity.Id)
                .ToListAsync();

                _context.RemoveRange(comments);

                _context.Remove(activity);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}