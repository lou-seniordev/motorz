using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Feeds
{
    public class MappingProfile : Profile
    {
         public MappingProfile()
        {
            CreateMap<Feed, FeedDto>()
                .ForMember(d => d.NotifierPhotoUrl, o => o.MapFrom(s => s.Notifier.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}