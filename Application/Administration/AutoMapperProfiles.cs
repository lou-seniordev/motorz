using System.Linq;
using Application.AdministrationDTOs;
using AutoMapper;
using Domain;


namespace Application.Administration
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()//;
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
                .ForMember(dest => dest.Rank, opt => opt.MapFrom(src => src.Rank.Title))
                .ForMember(dest => dest.Points, opt => opt.MapFrom(src => src.Points))
                .ForMember(dest => dest.UserRoles, opt => opt
                    .MapFrom(src => src.UserRoles.Where(x => x.UserId == src.Id).Select(x => x.Role.Name)))
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url)); 
            CreateMap<Photo, PhotoDto>();

            CreateMap<Activity, ActivityDTO>()
                .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Country.Name));

            CreateMap<Product, ProductDTO>()
             .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.ProductPhoto.Url))
             .ForMember(d => d.SellerDisplayName, o => o.MapFrom(s => s.Seller.DisplayName));

            CreateMap<Forumpost, ForumpostDTO>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.AuthorPhotoUrl, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<Mechanic, MechanicDTO>()
                .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.MechanicPhoto.Url))
                .ForMember(d => d.AverageRating, o => o.MapFrom(s => s.AverageRating.Average))
                .ForMember(d => d.Publisher, o => o.MapFrom(s => s.Publisher.DisplayName));

            CreateMap<Motofy, MotofyDTO>()
                .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.MotofyPhoto.Url))
                .ForMember(d => d.AverageRating, o => o.MapFrom(s => s.AverageRating.Average))
                .ForMember(d => d.PublisherDisplayName, o => o.MapFrom(s => s.Publisher.DisplayName));
            CreateMap<Brand, MotofyDTO>()
                .ForMember(d => d.BrandName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.BrandLogoUrl, o => o.MapFrom(s => s.LogoUrl));
            CreateMap<Country, MotofyDTO>()
                .ForMember(d => d.CountryName, o => o.MapFrom(s => s.Name));
        }
    }
}