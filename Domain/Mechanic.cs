using System;
using System.Collections;
using System.Collections.Generic;

namespace Domain
{
    public class Mechanic//: BaseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        // public virtual AppUser Publisher { get; set; }
        // public bool IsOwner { get; set; }
        // public string Owner { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public string YearOfStart { get; set; }
        public DateTime DatePublished { get; set; }
        public virtual Country Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public virtual AverageRating AverageRating { get; set; }
        public virtual ICollection<CommentMechanic> CommentMechanics { get; set; }
        public virtual ICollection<UserMechanic> Customers { get; set; }
        public virtual MechanicPhoto MechanicPhoto { get; set; }
        public virtual ICollection<MechanicRating> MechanicRatings { get; set; }

    }
}