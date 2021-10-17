using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class UserMotofyDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string YearOfProduction { get; set; }
        public DateTime DatePublished { get; set; }
        public string PhotoUrl { get; set; }

    }
}