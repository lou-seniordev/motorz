using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Products
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
             CreateMap<Product, ProductDto>()
            .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.ProductPhoto.Url))
            .ForMember(d => d.SellerUsername, o => o.MapFrom(s => s.Seller.UserName));
            CreateMap<Country, ProductDto>()
            .ForMember(d => d.CountryName, o => o.MapFrom(s => s.Name))
            .ForMember(d => d.CountryId, o => o.MapFrom(s => s.Id));

            CreateMap<ProductViewer, ProductViewerDto>()
            .ForMember(d => d.Username , o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            //             CreateMap<UserMotofy, EmbracerDto>()
            // .ForMember(d => d.Username , o => o.MapFrom(s => s.AppUser.UserName))
            // .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.AppUser.DisplayName))
            // .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
            // .ForMember(d => d.Following, o => o.MapFrom<EmbracingResolver>());

        }
    }
}