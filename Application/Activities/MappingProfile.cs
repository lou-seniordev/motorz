using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());
            //  CreateMap<UserActivity, ActivityDto>()
            //     .ForMember(d => d.HostName, o => o.MapFrom(s => s.IsHost ? s.AppUser.DisplayName : "unknown"));
            CreateMap<Country, ActivityDto>()
            .ForMember(d => d.CountryName, o => o.MapFrom(s => s.Name))
            .ForMember(d => d.CountryId, o => o.MapFrom(s => s.Id));
        }
    }
}