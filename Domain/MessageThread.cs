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
        public string InitUsername { get; set; }
        public string ReceiverUsername { get; set; }
        public bool InitDeleted { get; set; }
        public bool ReceiverDeleted { get; set; }
    }
}