using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class DiaryEntry
    {
        public Guid Id { get; set; }
        public DateTime EntryDate { get; set; }
        public int DayNumber { get; set; }
        public string Body { get; set; }
        public string Mood { get; set; }
        public string LocationCity { get; set; }
        public string LocationCountry { get; set; }
        public virtual Activity Activity { get; set; }
        public virtual DiaryPhoto DiaryPhoto { get; set; }



    }
}