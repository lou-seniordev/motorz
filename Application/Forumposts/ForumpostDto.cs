using System;

namespace Application.Forumposts
{
    public class ForumpostDto
    {
        public Guid Id { get; set; }
        public string DisplayName {get; set;}
        public string AuthorId {get; set;}
        public DateTime DateAdded { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Category { get; set; }
    }
}