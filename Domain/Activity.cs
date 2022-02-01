using System;
using System.Collections.Generic;

namespace Domain
{
    public class Activity//: BaseEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public virtual Country Country { get; set; }
        public string Venue { get; set; }
        public string Destination { get; set; }
        public bool IsActive { get; set; } = true;
        public virtual ICollection<UserActivity> UserActivities { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<CommentActivity> CommentActivities { get; set; }

    }
}