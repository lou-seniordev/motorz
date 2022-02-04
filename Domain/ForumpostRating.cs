using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ForumpostRating
    {
        public Guid Id { get; set; }
        public virtual AppUser Author { get; set; }
        public virtual Forumpost Forumpost { get; set; }
        public bool? IsInteresting { get; set; }
        public bool? IsUsefull { get; set; }
        public bool? IsHelping { get; set; }
        public int Rating { get; set; }

    }
}