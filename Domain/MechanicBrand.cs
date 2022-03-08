using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class MechanicBrand
    {
        public Guid BrandId { get; set; }
        public virtual Brand Brand { get; set; }
        public Guid MechanicId { get; set; }
        public virtual Mechanic Mechanic { get; set; }
        public DateTime DateAdded { get; set; }
    }
}