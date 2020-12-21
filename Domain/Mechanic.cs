using System;

namespace Domain
{
    public class Mechanic
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string  Owner {get; set;}
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        // public DateTime YearOfStart { get; set; }
        public string YearOfStart { get; set; }
        public DateTime DatePublished { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        
        // public virtual Brand Brand { get; set; } list of brands?
        // public virtual AverageRating { get; set; } ??
    }
}