using System;
using System.Collections.Generic;

namespace Domain
{
    public class Forumpost//: BaseEntity
    {
        public Guid Id { get; set; }
        public virtual AppUser Author { get; set; }
        public DateTime DateAdded { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Category { get; set; }
        public virtual ICollection<CommentForumPost> CommentForumPosts { get; set; }
        public virtual ICollection<ForumpostRating> ForumpostRatings { get; set; }
        public double ForumpostRating { get; set; }

       

    }
}