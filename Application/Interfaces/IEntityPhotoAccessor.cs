using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IEntityPhotoAccessor
    {
         PhotoUploadResult AddPhoto(IFormFile file, int height, int width);

         string DeletePhoto (string publicId);
    }
}