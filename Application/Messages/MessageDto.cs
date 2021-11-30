using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Messages
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public string SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string SenderPhotoUrl { get; set; }
        public string RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string RecipientPhotoUrl { get; set; }
        public Guid ProductId { get; set; }
        public string ProductPhotoUrl { get; set; }
        public string ProductTitle { get; set; }
        public string MessageThreadId { get; set; }
        public string Content { get; set; }
        public DateTime DateRead { get; set; }
        public DateTime DateSent { get; set; }
    }
}