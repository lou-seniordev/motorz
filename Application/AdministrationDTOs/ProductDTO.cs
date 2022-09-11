using System;

namespace Application.AdministrationDTOs
{
    public class ProductDTO
    {
        public Guid Id { get; set; }
        public string SellerDisplayName { get; set; }
        public string Title { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string CountryName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public bool IsSold { get; set; }
        public bool IsAdvertised { get; set; }
        public int NumberSeen { get; set; }
        public int NumberFollowed { get; set; }
        public DateTime DatePublished { get; set; }
        public DateTime? DateActivated { get; set; }
        public DateTime? DateAdvertised { get; set; }
        public DateTime? AdvertisingEndDate { get; set; }
        public string TypeAdvertising { get; set; }
        public string PhotoUrl { get; set; }


    }
}