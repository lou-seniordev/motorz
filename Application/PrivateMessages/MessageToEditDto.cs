using System;

namespace Application.PrivateMessages
{
    public class MessageToEditDto
    {
        public Guid Id { get; set; }
        public string PrivateMessageThreadId { get; set; }
        public string Content { get; set; }
        public string RecipientUsername { get; set; }
        public string SenderUsername { get; set; }
        public string SenderPhotoUrl { get; set; }

    }
}