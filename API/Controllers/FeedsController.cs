using System;
using System.Threading.Tasks;
using Application.Feeds;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FeedsController: BaseController
    {
        [HttpPost("{id}/addFeedItem")]
        public async Task<ActionResult<Unit>> AddFeedItem__JoiningDiary(Guid id)
        {
            return await Mediator.Send(new AddFeedItemJoiningDiary.Command{DiaryId = id});

        }

        //  [HttpPost("{id}/attend")]
        // public async Task<ActionResult<Unit>> Attend(Guid id)
        // {
        //     return await Mediator.Send(new Attend.Command { Id = id });
        // }
        // [HttpPost("{id}/addFeedItem__AddingDiary")]
        // public async Task<ActionResult<Unit>> AddFeedItem__AddingDiary(Guid diaryId)
        // {
        //     return await Mediator.Send(new AddFeedItemAddingDiary.Command{DiaryId = diaryId});

        // }
       
    }
}