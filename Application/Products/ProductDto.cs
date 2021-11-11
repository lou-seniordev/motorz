using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Products
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        // public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdvertised { get; set; }
        public DateTime DatePublished { get; set; }
        public DateTime DateActivated { get; set; }
        public DateTime DateAdvertised { get; set; }
        public int ActivationCounter { get; set; }
        public string PhotoUrl { get; set; }
        // public virtual Photo ProductPhoto { get; set; }
    }
}