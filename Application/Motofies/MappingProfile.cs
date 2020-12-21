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
            // .ForMember(d => d.BrandName , o => o.MapFrom(s => s.BrandId));
        }
    }
}