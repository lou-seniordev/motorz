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
            .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.MechanicPhoto.Url));
            CreateMap<Country, MechanicDto>()
            .ForMember(d => d.CountryName, o => o.MapFrom(s => s.Name))
            .ForMember(d => d.CountryId, o => o.MapFrom(s => s.Id));
            // .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.MotofyPhoto.Url));
            CreateMap<UserMechanic, CustomerDto>()
            .ForMember(d => d.Username , o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            // .ForMember(d => d.Testimonial, o => o.MapFrom(s => s.Testimonial));

            // CreateMap<MechanicRating, MechanicRatingDto>()
            // .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName))
            // .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.User.DisplayName));
            
          
        }
    }
}