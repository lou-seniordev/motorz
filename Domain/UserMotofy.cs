using System;

namespace Domain
{
    public class UserMotofy
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid MotofyId { get; set; }
        public virtual Motofy Motofy { get; set; }
        public DateTime DateEmbraced { get; set; }
        public bool IsOwner { get; set; }

    }
}