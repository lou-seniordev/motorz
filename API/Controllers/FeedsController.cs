using System;
using System.Threading.Tasks;
using Application.Feeds;
using MediatR;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FeedsController: BaseController
    {
        [AllowAnonymous]
        [HttpPost("{id}/{info}/{username}/addFeedItem")]
        public async Task<ActionResult<Unit>> AddFeedItem(Guid id, string info, string username)
        {
            return await Mediator.Send(new AddFeedItem.Command{ObjectId = id, Info = info, Username = username});

        }

        [HttpGet]
         public async Task<ActionResult<List.FeedEnvelope>> List(int? limit, int? offset)
        {
            return await Mediator.Send(new List.Query(limit, offset));
        }

       
    }
}