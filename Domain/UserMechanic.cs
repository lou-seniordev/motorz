using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class UserMechanic
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid MechanicId { get; set; }
        public virtual Mechanic Mechanic { get; set; }
        public virtual Testimonial Testimonial { get; set; }
        public bool IsOwner { get; set; } = false;
        public bool IsCustomer { get; set; } = true;
        public bool CustomerRecommended { get; set; } = false;
        public DateTime? DateBecameCustomer { get; set; } = DateTime.Now;
    }
}