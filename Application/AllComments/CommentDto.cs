using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.AllComments
{
    public class CommentDto : CommentBase
    {

        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }

    }
}