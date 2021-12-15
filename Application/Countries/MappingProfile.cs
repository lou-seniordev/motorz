using AutoMapper;
using Domain;

namespace Application.Countries
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // CreateMap<Country, BrandDto>();
            CreateMap<Country, CountryToSelectDto>()
            .ForMember(d => d.Key, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Text, o => o.MapFrom(s => s.Name))
            .ForMember(d => d.Value, o => o.MapFrom(s => s.Name));
        }
        
    }
}