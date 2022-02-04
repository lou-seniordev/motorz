using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Profiles
{
    //==Redundant but kept for future options== (code:finduser)
    //==possibly OK to keep for it is simpler that the ForumpostDto
    public class UserForumpostDto
    {

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime DateAdded { get; set; }
    }
}