using System;
using System.Threading.Tasks;
using Application.Administration;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
namespace API.ActionFilters
{
    public class LogUserActivity : IAsyncActionFilter
    {
        private readonly IUserAccessor _userAccessor;
        public LogUserActivity(IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if(!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var userId = _userAccessor.GetCurrentUserId();

            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await repo.GetUserByIdAsync(userId);
            user.LastActive = DateTime.Now;

            await repo.SaveAllAsync();
        }
    }
}