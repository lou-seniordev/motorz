using System.Linq;
using AutoMapper;
using Domain;
namespace Application.Motofies
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Motofy, MotofyDto>();
            CreateMap<UserMotofy, EmbracerDto>()
            .ForMember(d => d.Username , o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName , o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}