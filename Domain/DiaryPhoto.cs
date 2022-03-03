using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class DiaryPhoto
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public DateTime DateUploaded { get; set; }
        public Guid DiaryEntryForeignKey { get; set; }
        public virtual DiaryEntry DiaryEntry { get; set; }
        
    }
}