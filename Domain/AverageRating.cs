using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class AverageRating
    {
        public Guid Id { get; set; }
        public int Count { get; set; }
        public double Average { get; set; }
        
    }
}