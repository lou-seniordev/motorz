using System;
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class EntityPhotoAccessor : IEntityPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;

        public EntityPhotoAccessor(IOptions<CloudinarySettings> config)
        {
             var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        public PhotoUploadResult AddPhoto(IFormFile file, int height, int width)
        {
            var uploadResult = new ImageUploadResult();

            if(file.Length > 0) 
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation()
                            .Height(height)
                            .Width(width)
                            .Crop("fill") 
                            .Gravity("center")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            if(uploadResult.Eager != null)
                throw new Exception(uploadResult.Error.Message);

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.AbsoluteUri
            };
        }

        public string DeletePhoto(string publicId)
        {
            var deleteParamas = new DeletionParams(publicId);

            var result = _cloudinary.Destroy(deleteParamas);
            return result.Result == "ok" ? result.Result : null;

        }
    }
}