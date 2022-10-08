using System;
using System.Text.Json.Serialization;

namespace Domain
{
    public class MotofyPhoto
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public Guid MotofyForeignKey { get; set; }
        [JsonIgnore]
        public virtual Motofy Motofy { get; set; }

    }
}