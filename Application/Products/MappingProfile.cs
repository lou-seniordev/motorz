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
        }
    }
}