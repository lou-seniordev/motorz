using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MotofyPhotos
{
    public class AddMotofyPhoto
    {
        public class Command : IRequest<MotofyPhoto>
        {
            public IFormFile File { get; set; }
             public Guid MotorfyId { get; set; }

        }


        public class Handler : IRequestHandler<Command, MotofyPhoto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<MotofyPhoto> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUploadResult = _photoAccessor.AddPhoto(request.File);

                // var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                // var motofy = await _context.Motofies.SingleOrDefaultAsync(m => m.Id == request.MotorfyId);
                var motofy = await _context.Motofies.SingleOrDefaultAsync(m => m.Id == Guid.Parse("7fc52731-24a2-425e-bd88-fbd5a7c8d602"));

                var motofyPhoto = new MotofyPhoto
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId,
                    DateUploaded = DateTime.Now,
                    // MotofyForeignKey = request.MotorfyId
                    MotofyForeignKey = Guid.Parse("7fc52731-24a2-425e-bd88-fbd5a7c8d602")
                };

                // //==HERE I need some sort of check...
                motofy.MotofyPhoto = motofyPhoto;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return motofyPhoto;

                throw new Exception("Problem Saving Changes");
                // return motofyPhoto;


            }
        }
    }
}