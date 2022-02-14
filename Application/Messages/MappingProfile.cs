using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Messages
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(
                    src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(
                    src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.ProductPhotoUrl, opt => opt.MapFrom(
                    src => src.Product.ProductPhoto.Url))
                .ForMember(dest => dest.ProductTitle, opt => opt.MapFrom(
                    src => src.Product.Title))
                .ForMember(dest => dest.MessageThreadId, opt => opt.MapFrom(
                    src => src.MessageThread.Id));
        }
    }
}