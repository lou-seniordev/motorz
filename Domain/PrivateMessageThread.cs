using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class PrivateMessageThread
    {
        
        public Guid Id { get; set; }
        public virtual ICollection<PrivateMessage> PrivateMessages { get; set; }
        public string InitUsername { get; set; }
        public string ReceiverUsername { get; set; }
        public bool InitDeleted { get; set; }
        public bool ReceiverDeleted { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}