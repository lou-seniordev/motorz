using System.Linq;
using AutoMapper;
using Domain;
namespace Application.DiaryEntries
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<DiaryEntry, DiaryEntryDto>()
            .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.DiaryPhoto.Url));

        }
    }
}