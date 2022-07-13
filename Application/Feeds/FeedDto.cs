using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Feeds
{
    public class FeedDto
    {
        public Guid Id { get; set; }
        public string Info { get; set; }
        public string NotifierUsername { get; set; }
        public string NotifierDisplayname { get; set; }
        public string NotifierPhotoUrl { get; set; }
        public string Title { get; set; }
        public Guid ObjectId { get; set; }
        public DateTime DateTriggered { get; set; }
        public bool IsSeen { get; set; }
        public DateTime DateSeen { get; set; }

    }
}