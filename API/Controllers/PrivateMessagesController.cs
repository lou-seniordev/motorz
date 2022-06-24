using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.PrivateMessages;
using MediatR;
using System;

namespace API.Controllers
{
    public class PrivateMessagesController : BaseController
    {
        [HttpGet("checkUnread")]
        public async Task<ActionResult<int>> CheckUnread()
        {
            return await Mediator.Send(new CheckUnread.Query());
        }
        [HttpGet]
        public async Task<ActionResult<List.PrivateMessagesEnvelope>> List(int? limit, int? offset)
        {
            return await Mediator.Send(new List.Query(limit, offset));
        }

        [HttpPost]
        public async Task<ActionResult<PrivateMessageDto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}/markRead")]
        public async Task<ActionResult<Unit>> MarkRead(Guid id)
        {
            return await Mediator.Send(new MarkRead.Command { Id = id });
        }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult<Unit>> DeleteSingleMessage (Guid id)
        // {
        //     return await Mediator.Send(new Delete.Command {Id = id});
        // }


    }
}