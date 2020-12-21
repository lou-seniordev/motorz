using System;
using System.Collections.Generic;
namespace Domain
{
    public class Brand
    { 
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfEstablishment { get; set; }
        public string LogoUrl { get; set; }
        public string LandOfOrigin { get; set; }
        public string CityOfOrigin { get; set; }
        public virtual ICollection<Motofy> Motofies { get; set; }
        
    }
}