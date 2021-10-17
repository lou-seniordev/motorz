using AutoMapper;
using Domain;

namespace Application.Brands
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Brand, BrandDto>();
            CreateMap<Brand, BrandToSelectDto>()
            .ForMember(d => d.Key, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Text, o => o.MapFrom(s => s.Name))
            .ForMember(d => d.Value, o => o.MapFrom(s => s.Name));
        }
    }
}