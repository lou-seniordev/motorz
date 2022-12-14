using System;
using System.Collections.Generic;
using Application.AllComments;

namespace Application.Forumposts
{
    public class ForumpostDto
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string AuthorPhotoUrl {get; set;}
        public DateTime DateAdded { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Category { get; set; }
        public virtual ICollection<CommentForumPostDto> CommentForumPosts { get; set; }
        public double ForumpostRating { get; set; }
        public virtual ICollection<ForumpostRatingDto> ForumpostRatings { get; set; } 


    }
}