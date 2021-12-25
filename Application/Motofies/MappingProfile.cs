using System.Linq;
using AutoMapper;
using Domain;
namespace Application.Motofies
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // CreateMap<MotofyPhoto, Motofy>()
            // .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.Url));
            CreateMap<Motofy, MotofyDto>()
            .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.MotofyPhoto.Url));
            CreateMap<UserMotofy, EmbracerDto>()
            .ForMember(d => d.Username , o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Brand, MotofyDto>()
            .ForMember(d => d.BrandName, o => o.MapFrom(s => s.Name))
            .ForMember(d => d.BrandId, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.BrandLogoUrl, o => o.MapFrom(s => s.LogoUrl));
            CreateMap<Country, MotofyDto>()
            .ForMember(d => d.CountryName, o => o.MapFrom(s => s.Name))
            .ForMember(d => d.CountryId, o => o.MapFrom(s => s.Id));

             CreateMap<MotofyScore, MotofyScoreDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName))
            .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.User.DisplayName));

        }
    }
}