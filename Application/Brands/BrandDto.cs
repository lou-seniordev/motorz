using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

namespace Application.Brands
{
    public class BrandDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfEstablishment { get; set; }
        public string LogoUrl { get; set; }
        public string LandOfOrigin { get; set; }
        public string CityOfOrigin { get; set; }
    }
}