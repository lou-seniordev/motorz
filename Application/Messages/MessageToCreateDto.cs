using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Messages
{
    public class MessageToCreateDto
    { 
        public string RecipientUsername { get; set; }  
        public string Content { get; set; }
        public Guid ProductId { get; set; }
   
    }
}