using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Common
{
    public class MappingProfile: Profile
    {
         public MappingProfile()
        {
           
            CreateMap<Rating, RatingDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName))
            .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.User.DisplayName));       
           
        }
    }
}