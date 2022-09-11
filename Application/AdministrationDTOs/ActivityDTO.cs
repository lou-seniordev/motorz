using System;

namespace Application.AdministrationDTOs
{
    public class ActivityDTO
    {
         public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public virtual string Country { get; set; }
        public string Departure { get; set; }
        public string Destination { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsCompleted { get; set; } = false;

    }
}