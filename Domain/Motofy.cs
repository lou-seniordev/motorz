using System;
using System.Collections.Generic;

namespace Domain
{
    public class Motofy
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        // public Brand Brand { get; set; } 
        public string Brand { get; set; } 
        public string Model { get; set; }
        public string CubicCentimeters { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public string YearOfProduction { get; set; }
        public DateTime DatePublished { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PricePaid { get; set; }
        public string EstimatedValue { get; set; }
        public string NumberOfKilometers { get; set; }
        public virtual ICollection<UserMotofy> UserMotofies { get; set; }
    }
}