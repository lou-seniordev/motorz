using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class UserProductDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Price { get; set; }
        public string PictureUrl { get; set; }
        public DateTime DatePublished { get; set; }

    }
}