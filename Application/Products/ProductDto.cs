using System;
using System.Collections.Generic;

namespace Application.Products
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string SellerId { get; set; }
        public string SellerUsername { get; set; }
        public string SellerDisplayName { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string CountryName { get; set; }
        public string CountryId { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public bool IsSold { get; set; }
        public bool IsAdvertised { get; set; }
        public int NumberSeen { get; set; }
        public int NumberFollowed { get; set; }
        public DateTime DatePublished { get; set; }
        public DateTime DateActivated { get; set; }
        public DateTime DateAdvertised { get; set; }
        public DateTime? AdvertisingEndDate { get; set; }
        public string TypeAdvertising { get; set; }
        public DateTime InactivityExpirationDate { get; set; }
        public int ActivationCounter { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<ProductViewerDto> Viewers { get; set; }

    }
}