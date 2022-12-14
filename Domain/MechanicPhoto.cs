using System;
// using System.Text.Json.Serialization;

namespace Domain
{
    public class MechanicPhoto
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public DateTime DateUploaded { get; set; }
        public Guid MechanicForeignKey { get; set; }
        public virtual Mechanic Mechanic { get; set; }
    }
}