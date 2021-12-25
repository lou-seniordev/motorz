using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Mechanics
{
    public class CustomerDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public bool IsOwner { get; set; }
        public bool IsCustomer { get; set; } 
        public bool CustomerRecommended { get; set; } 
        public Testimonial  Testimonial { get; set; }
    }
}