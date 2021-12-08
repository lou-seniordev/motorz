using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class CommentMotofy : CommentBase
    {
        // public Guid Id { get; set; }
        // public string Body { get; set; }
        public virtual AppUser Author { get; set; }
        public virtual Motofy Motofy { get; set; }
        // public DateTime CreatedAt { get; set; }
    }
}