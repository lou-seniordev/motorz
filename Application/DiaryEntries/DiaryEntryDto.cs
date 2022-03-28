using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DiaryEntries
{
    public class DiaryEntryDto
    {
        public string Id { get; set; }
        public DateTime EntryDate { get; set; }
        public int DayNumber { get; set; }
        public string Body { get; set; }
        public string Mood { get; set; }
        public string LocationCity { get; set; }
        public string LocationCountry { get; set; }
        public string Road { get; set; }
        public string Weather { get; set; }

        public int? NumberOfKilometers { get; set; }
        public string PhotoUrl { get; set; }
    }
}