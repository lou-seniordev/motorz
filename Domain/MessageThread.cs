using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class MessageThread
    {
        public Guid Id { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
    }
}