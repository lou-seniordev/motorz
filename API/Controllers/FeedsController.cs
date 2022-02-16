using System;
using System.Threading.Tasks;
using Application.Feeds;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FeedsController: BaseController
    {
        [HttpPost("{id}/{info}/addFeedItem")]
        public async Task<ActionResult<Unit>> AddFeedItem(Guid id, string info)
        {
            return await Mediator.Send(new AddFeedItem.Command{ObjectId = id, Info = info});

        }
        [HttpDelete("{id}/removeFeedItem")]
        public async Task<ActionResult<Unit>> RemoveFeedItem(Guid id)
        {
            return await Mediator.Send(new RemoveFeedItem.Command{Id = id});

        }

        [HttpGet]
         public async Task<ActionResult<List.FeedEnvelope>> List(int? limit, int? offset
        //  ,   bool bestRated, bool mostEmbraced, bool iEmbraced
        )
        {
            return await Mediator.Send(new List.Query(limit, offset
            // , bestRated, mostEmbraced, iEmbraced
            ));
        }

       
    }
}