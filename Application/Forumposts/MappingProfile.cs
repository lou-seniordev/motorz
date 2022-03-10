using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Forumposts
{
    public class MappingProfile : Profile
    {
          public MappingProfile()
        {
            CreateMap<Forumpost, ForumpostDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.AuthorPhotoUrl, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url))
            ;

            CreateMap<ForumpostRating, ForumpostRatingDto>()
            .ForMember(d => d.AuthorUsername, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.ForumpostId, o => o.MapFrom(s => s.Forumpost.Id));
        }
    }
}