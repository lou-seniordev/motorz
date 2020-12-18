using System.Linq;
using AutoMapper;
using Domain;
namespace Application.Motofies
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Motofy, MotofyDto>()
            .ForMember(d => d.BrandId , o => o.MapFrom(s => s.Brand.Name));
        }
    }
}