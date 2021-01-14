using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsOwnerRequirement : IAuthorizationRequirement
    {

    }

    public class IsOwnerRequirementHandler : AuthorizationHandler<IsOwnerRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsOwnerRequirementHandler(IHttpContextAccessor httpContextAccessor,
            DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IsOwnerRequirement requirement)
        {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
                .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var motofyId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value.ToString());

            var motofy = _context.Motofies.FindAsync(motofyId).Result; 

            var host = motofy.UserMotofies.FirstOrDefault(x => x.IsOwner);

            if(host?.AppUser?.UserName == currentUserName)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}