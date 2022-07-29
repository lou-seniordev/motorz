using System.Linq;
using AutoMapper;
using Domain;


namespace Application.Administration
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()//;
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
                .ForMember(dest => dest.Rank, opt => opt.MapFrom(src => src.Rank.Title))
                .ForMember(dest => dest.Points, opt => opt.MapFrom(src => src.Points))
                // .ForMember(dest => dest.FollowersCount.)
                .ForMember(dest => dest.UserRoles, opt => opt
                    .MapFrom(src => src.UserRoles.Where(x => x.UserId == src.Id).Select(x => x.Role.Name)))
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url)); 
            CreateMap<Photo, PhotoDto>();
            // CreateMap<MemberUpdateDto, AppUser>();
            // CreateMap<RegisterDto, AppUser>();
        }
    }
}