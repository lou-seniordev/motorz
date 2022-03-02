using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Comments;

namespace Application.Activities
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string CountryName { get; set; }
        public string CountryId { get; set; }
        // public string Venue { get; set; }
        public string Departure { get; set; }
        public string Destination { get; set; }
        public bool IsActive { get; set; }

        [JsonPropertyName("attendees")]
        public ICollection<AttendeeDto> UserActivities { get; set; }//UserActivities
        public ICollection<CommentDto> Comments { get; set; }
    }
}