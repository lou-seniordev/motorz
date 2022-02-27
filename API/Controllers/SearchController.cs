using System.Threading.Tasks;
using Application.Activities;
using Application.Search;
using MediatR;
// using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SearchController: BaseController
    {
        [HttpGet("activities")]
        // [Authorize]
        public async Task<ActionResult<SearchActivities.ActivitiesEnvelope>> SearchActivities(string search, int? limit, int? offset)
        {
            return await Mediator.Send(new SearchActivities.Query (search, limit, offset));
         }
    }
}