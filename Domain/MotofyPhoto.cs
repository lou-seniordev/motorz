using System;
using System.Text.Json.Serialization;

namespace Domain
{
    public class MotofyPhoto
    {
        // [ForeignKey("Motofy")]
        public string Id { get; set; }
        // public Guid Id { get; set; }
        public string Url { get; set; }
        // public DateTime DateUploaded { get; set; }
        public Guid MotofyForeignKey { get; set; }
        [JsonIgnore]
        public virtual Motofy Motofy { get; set; }
        // public virtual AppUser AppUser { get; set; }

    }
}