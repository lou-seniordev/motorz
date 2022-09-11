using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime JoinedUs { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int Points { get; set; } = 0;
        public bool Suspended { get; set; } = false;
        public virtual Rank Rank { get; set; }
        public virtual ICollection<Brand> FavoriteBrands { get; set; }
        public virtual ICollection<UserActivity> UserActivities { get; set; } //virtual??
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<UserFollowing> Followings { get; set; }
        public virtual ICollection<UserFollowing> Followers { get; set; }
        public virtual ICollection<UserMotofy> UserMotofies { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<UserMechanic> Mechanics { get; set; }
        public virtual ICollection<PrivateMessage> PrivateMessagesSent { get; set; }
        public virtual ICollection<PrivateMessage> PrivateMessagesReceived { get; set; }
        public virtual ICollection<ProductViewer> ViewingProducts { get; set; }
        public virtual ICollection<AppUserRole> UserRoles { get; set; }


    }
}