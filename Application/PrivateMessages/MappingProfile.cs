using System.Linq;
using AutoMapper;
using Domain;

namespace Application.PrivateMessages
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PrivateMessage, PrivateMessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(
                    src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(
                    src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.PrivateMessageThreadId, opt => opt.MapFrom(
                    src => src.PrivateMessageThread.Id));
        }
    }
}
