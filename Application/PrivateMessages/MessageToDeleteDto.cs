using System;


namespace Application.PrivateMessages
{
    public class MessageToDeleteDto
    {
        public Guid Id { get; set; }
        public Guid PrivateMessageThreadId { get; set; }

    }
}