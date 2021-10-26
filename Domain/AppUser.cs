using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public virtual  ICollection<UserActivity> UserActivities { get; set; } //virtual??
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<UserFollowing> Followings {get; set;}
        public virtual ICollection<UserFollowing> Followers { get; set; }
        public virtual ICollection<UserMotofy> UserMotofies { get; set; }
        // public virtual MotofyPhoto MotofyPhoto { get; set; }
    }
}