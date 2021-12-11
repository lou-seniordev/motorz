using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class CommentMechanic: CommentBase
    {
        public virtual AppUser Author { get; set; }

        public virtual Mechanic Mechanic { get; set; }
    }
}