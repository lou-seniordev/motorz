using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.AdministrationDTOs
{
    public class MotofyDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PublisherDisplayName { get; set; }
        public string BrandName { get; set; }
        public string BrandLogoUrl { get; set; }
        public string Model { get; set; }
        public string CubicCentimeters { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public string YearOfProduction { get; set; }
        public DateTime DatePublished { get; set; }
        public string City { get; set; }
        public string CountryName { get; set; }
        public string PricePaid { get; set; }
        public string EstimatedValue { get; set; }
        public string NumberOfKilometers { get; set; }
        public int TotalEmbraced { get; set; }
        public double AverageRating { get; set; }
        
    }
}