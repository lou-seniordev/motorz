using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Messages
{
    public class MessageThreadDto
    {
        public Guid Id { get; set; }

        public MessageDto[] Messages { get; set; }
    }
}