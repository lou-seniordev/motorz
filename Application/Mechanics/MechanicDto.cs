using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AllComments;
using Application.Common;
using Domain;

namespace Application.Mechanics
{
    public class MechanicDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Publisher { get; set; }
        public string PublisherUsername { get; set; }
        public string Owner { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public string YearOfStart { get; set; }
        public DateTime DatePublished { get; set; }
        public string CountryName { get; set; }
        public string CountryId { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public int TotalRecommended { get; set; }
        public double AverageRating { get; set; }
        public virtual ICollection<CommentMechanicDto> CommentMechanics { get; set; }
        public virtual ICollection<CustomerDto> Customers { get; set; }
        public virtual ICollection<RatingDto> Ratings { get; set; }
        public virtual ICollection<MechanicBrandDto> Brands { get; set; }


    }
}