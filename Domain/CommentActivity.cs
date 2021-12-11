using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class CommentActivity : CommentBase
    {
        public virtual AppUser Author { get; set; }

        public virtual Activity Activity { get; set; }
    }
}