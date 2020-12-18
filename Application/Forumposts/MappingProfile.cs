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
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.UserName));
            // .ForMember(d => d.AuthorId, o => o.MapFrom(s => s.Author.Id));
            // .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x 
            // => x.IsMain).Url));

            // CreateMap<ForumpostDto, Forumpost>()
            // .ForMember(d => d.Author.UserName, o => o.MapFrom(s => s.DisplayName));
        }
    }
}