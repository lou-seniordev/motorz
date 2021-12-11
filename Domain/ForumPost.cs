using System;
using System.Collections.Generic;

namespace Domain
{
    public class Forumpost
    {
        public Guid Id { get; set; }
        public virtual AppUser Author {get; set;}
        public DateTime DateAdded { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }

        // category will have a set photo in client app
        public string Category { get; set; }
        public virtual ICollection<CommentForumPost> CommentForumPosts { get; set; }
     
    }
}