using System;
using System.Collections.Generic;
using Domain;

namespace Application.Administration
{
    public class MemberDto
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string PhotoUrl { get; set; }
        public string Bio { get; set; }
        public int Age { get; set; }
        public DateTime JoinedUs { get; set; }
        public DateTime LastActive { get; set; } 
        public string Gender { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Rank { get; set; }
        public string Points { get; set; }
        public bool Suspended { get; set; }
        public ICollection<string> UserRoles { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingsCount { get; set; }

                
        // public ICollection<Activity> MyActivities { get; set; } //virtual??
        // public ICollection<PhotoDto> Photos { get; set; }
        // // public virtual ICollection<UserFollowing> Followings { get; set; }
        // // public virtual ICollection<UserFollowing> Followers { get; set; }
        // public ICollection<Motofy> MyMotofies { get; set; }
        // public ICollection<Product> MyProducts { get; set; }
        // public ICollection<AppUserRole> MyRoles { get; set; }
    }
}