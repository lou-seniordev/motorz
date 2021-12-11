using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class CommentForumPost : CommentBase
    {
        public virtual AppUser Author { get; set; }

        public virtual Forumpost Forumpost { get; set; }
    }
}