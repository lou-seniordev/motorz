using System;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdvertised { get; set; }
        public DateTime DatePublished { get; set; }
        public DateTime DateActivated { get; set; }
        public DateTime DateAdvertised { get; set; }
        public int ActivationCounter { get; set; }
        public virtual Photo ProductPhoto { get; set; }

    }
}
