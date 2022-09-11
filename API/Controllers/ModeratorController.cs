using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize(Policy = "RequireModeratorRole")]
    public class ModeratorController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        public ModeratorController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("activities-to-moderate")]
        public ActionResult GetActivitiesForModerations()
        {
            return Ok("Admins or moderators can see this");
        }
    }

}