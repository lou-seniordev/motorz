using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.AllComments;

namespace Application.Mechanics
{
    public class MechanicDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string  Owner {get; set;}
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public string YearOfStart { get; set; }
        public DateTime DatePublished { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }

        public virtual ICollection<CommentMechanicDto> CommentMechanics { get; set; }
    }
}