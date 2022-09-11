using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.AdministrationDTOs
{
    public class ForumpostDTO
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string AuthorPhotoUrl {get; set;}
        public DateTime DateAdded { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Category { get; set; }
        public double ForumpostRating { get; set; }
    }
}