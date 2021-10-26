using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IMotofyPhotoAccessor
    {
         PhotoUploadResult AddPhoto(IFormFile file);

         string DeletePhoto (string publicId);
    }
}