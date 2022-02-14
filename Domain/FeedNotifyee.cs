using System;

namespace Domain
{
    public class FeedNotifyee
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        // public string DisplayName { get; set; }
        public Guid FeedId { get; set; }
    }
}