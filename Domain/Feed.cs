using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
   
    public class Feed
    {
        public Guid Id { get; set; }
        public string Info { get; set; }
        public virtual AppUser Notifier { get; set; }
        public virtual ICollection<FeedNotifyee> Notifyees { get; set; }
        public Guid ObjectId { get; set; }
        public DateTime DateTriggered { get; set; }
        public virtual string FeedType { get; set; }
    }
}