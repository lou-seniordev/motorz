using System;
using System.Collections.Generic;

namespace Domain
{
    public class Motofy
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public virtual AppUser Publisher { get; set; }
        public virtual Brand Brand { get; set; }
        public string Model { get; set; }
        public string CubicCentimeters { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public string YearOfProduction { get; set; }
        public DateTime DatePublished { get; set; }
        public string City { get; set; }
        public virtual Country Country { get; set; }
        public string PricePaid { get; set; }
        public string EstimatedValue { get; set; }
        public string NumberOfKilometers { get; set; }
        public int TotalEmbraced { get; set; }
        public virtual AverageRating AverageRating { get; set; }
        public virtual ICollection<UserMotofy> UserMotofies { get; set; }
        public virtual MotofyPhoto MotofyPhoto { get; set; }
        public virtual ICollection<CommentMotofy> CommentMotofies { get; set; }
        public virtual ICollection<MotofyScore> MotofyScores { get; set; }
    }
}