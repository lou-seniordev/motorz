using System;
using System.Collections.Generic;

namespace Application.AdministrationDTOs
{
    public class MechanicDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Publisher { get; set; }
        public string Owner { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public string YearOfStart { get; set; }
        public DateTime DatePublished { get; set; }
        public string CountryName { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public int TotalRecommended { get; set; }
        public double AverageRating { get; set; }
    }
}