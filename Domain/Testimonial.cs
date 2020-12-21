using System;

namespace Domain
{
    public class Testimonial
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTime DateAdded { get; set; }
    }
}