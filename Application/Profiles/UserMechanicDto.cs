using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class UserMechanicDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DatePublished { get; set; }

    }
}