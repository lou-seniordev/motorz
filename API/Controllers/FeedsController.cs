using System;
using System.Threading.Tasks;
using Application.Feeds;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FeedsController: BaseController
    {
        [HttpPost("{id}/{info}/{username}/addFeedItem")]
        public async Task<ActionResult<Unit>> AddFeedItem(Guid id, string info, string username)
        {
            return await Mediator.Send(new AddFeedItem.Command{ObjectId = id, Info = info, Username = username});

        }
        [HttpDelete("{id}/{info}/removeFeedItem")]
        public async Task<ActionResult<Unit>> RemoveFeedItem(Guid id, string info)
        {
            return await Mediator.Send(new RemoveFeedItem.Command{Id = id,  Info = info});
        }

        [HttpGet]
         public async Task<ActionResult<List.FeedEnvelope>> List(int? limit, int? offset)
        {
            return await Mediator.Send(new List.Query(limit, offset));
        }

       
    }
}