using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Mechanics
{
    public class MappingProfile: Profile
    {
         public MappingProfile()
        {
           
            CreateMap<Mechanic, MechanicDto>()
            .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.MechanicPhoto.Url))
            .ForMember(d => d.AverageRating, o => o.MapFrom(s => s.AverageRating.Average))
            .ForMember(d => d.Publisher, o => o.MapFrom(s => s.Publisher.DisplayName))
            .ForMember(d => d.PublisherUsername, o => o.MapFrom(s => s.Publisher.UserName));
;
            CreateMap<Country, MechanicDto>()
            .ForMember(d => d.CountryName, o => o.MapFrom(s => s.Name))
            .ForMember(d => d.CountryId, o => o.MapFrom(s => s.Id));
            // .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.MotofyPhoto.Url));
            CreateMap<UserMechanic, CustomerDto>()
            .ForMember(d => d.Username , o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            // .ForMember(d => d.Testimonial, o => o.MapFrom(s => s.Testimonial));

            CreateMap<MechanicBrand, MechanicBrandDto>()
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Brand.Name))
            .ForMember(d => d.LogoUrl, o => o.MapFrom( s=> s.Brand.LogoUrl))
            .ForMember(d => d.DateOfEstablishment, o => o.MapFrom(s => s.Brand.DateOfEstablishment));
            
          
        }
    }
}