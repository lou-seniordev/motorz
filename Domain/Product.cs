using System;
using System.Collections.Generic;

namespace Domain
{
    public class Product //: BaseEntity
    {
        public Guid Id { get; set; }
        // public string SellerId { get; set; }
        public virtual AppUser Seller { get; set; }
        public string Title { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        // public string Country { get; set; }
        public virtual Country Country { get; set; }

        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdvertised { get; set; }
        public bool IsSold { get; set; }
        public DateTime DatePublished { get; set; }
        public DateTime DateActivated { get; set; }
        public DateTime DateAdvertised { get; set; }
        public int ActivationCounter { get; set; }
        // public virtual Photo ProductPhoto { get; set; }
                
        public virtual ProductPhoto ProductPhoto { get; set; }

        public virtual ICollection<Message> Messages { get; set; }

    }
}
