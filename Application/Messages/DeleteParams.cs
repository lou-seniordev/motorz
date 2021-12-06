using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Messages
{
    public class DeleteParams
    {
        public IEnumerable<string> MessageThreadIds { get; set; }
    }
}