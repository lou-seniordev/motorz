using System;
using System.Text.Json.Serialization;

namespace Domain
{
    public class ProductPhoto
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public Guid ProductForeignKey { get; set; }
        [JsonIgnore]
        public virtual Product Product { get; set; }
    }
}