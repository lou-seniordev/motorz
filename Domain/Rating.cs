using System;

namespace Domain
{
    public class Rating
    {
         public Guid Id { get; set; }
        public virtual AppUser User { get; set; }
        public int Score { get; set; }
    }
}