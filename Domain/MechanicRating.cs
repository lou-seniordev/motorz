using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class MechanicRating
    {
        public Guid Id { get; set; }
        public virtual AppUser User { get; set; }
        public int Score { get; set; }
    }
}