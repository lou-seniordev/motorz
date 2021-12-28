using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Common
{
    public class RatingDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public int Score { get; set; }
    }
}