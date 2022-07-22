using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppRole : IdentityRole
    {
        public virtual ICollection<AppUserRole> UserRoles { get; set; }
    }
}