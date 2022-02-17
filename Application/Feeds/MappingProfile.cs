using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Feeds
{
    public class MappingProfile : Profile
    {
         public MappingProfile()
        {
            // CreateMap<Feed, FeedDto>();
                // .ForMember(d => d.NotifierPhotoUrl, o => o.MapFrom(s => s.ObjectId.));
            CreateMap<Feed, FeedDto>()
                .ForMember(d => d.NotifierPhotoUrl, o => o.MapFrom(s => s.Notifier.Photos.FirstOrDefault(x => x.IsMain).Url));
            // CreateMap<Activity, FeedDto>()
            //     .ForMember(d => d.Title, o => o.MapFrom(s => s.Title.Where(d => d.)))
            
            // CreateMap<Activity, FeedDto>()
            //     .ForMember(d => d.Title, o => o.MapFrom(s => s.Title.FirstOrDefault(x => decimal.o)));    

            // CreateMap<UserActivity, AttendeeDto>()
            //     .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            //     .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            //     .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
            //     .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>()); 
            // CreateMap<Country, ActivityDto>()
            // .ForMember(d => d.CountryName, o => o.MapFrom(s => s.Name))
            // .ForMember(d => d.CountryId, o => o.MapFrom(s => s.Id));
        }
    }
}