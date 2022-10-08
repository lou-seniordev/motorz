using System;
using System.Text.Json.Serialization;


namespace Domain
{
  public class ActivityPhoto
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public Guid ActivityForeignKey { get; set; }
        [JsonIgnore]
        public virtual Activity Activity { get; set; }
    }
}