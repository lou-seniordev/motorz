using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.AllComments;
using Domain;

namespace Application.Motofies
{
    public class MotofyDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        //brand
        public string BrandName { get; set; }
        public string BrandId { get; set; }
        public string BrandLogoUrl { get; set; }

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
        [JsonPropertyName("embracers")]
        public ICollection<EmbracerDto> UserMotofies { get; set; }
        public ICollection<CommentMotofyDto> CommentMotofies { get; set; }
    }
}