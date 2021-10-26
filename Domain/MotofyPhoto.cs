using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
    public class MotofyPhoto
    {
        // [ForeignKey("Motofy")]
        public string Id { get; set; }
        // public Guid Id { get; set; }
        public string Url { get; set; }
        public DateTime DateUploaded { get; set; }
        public Guid MotofyForeignKey { get; set; }
        [JsonIgnore]
        public virtual Motofy Motofy { get; set; }
        // public virtual AppUser AppUser { get; set; }

    }
}