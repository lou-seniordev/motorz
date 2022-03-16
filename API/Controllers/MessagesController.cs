using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Messages;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using System;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseController
    {

        // [HttpPost]
        // public async Task<ActionResult<Unit>> Create(Create.Command command)
        // {
        //     return await Mediator.Send(command);
        // }
        [HttpPut("{id}/markRead")]
        public async Task<ActionResult<Unit>> MarkRead(Guid id)
        {
            return await Mediator.Send(new MarkRead.Command { Id = id });
        }

        [HttpGet]
        public async Task<ActionResult<List.MessagesEnvelope>> List(int? limit, int? offset)
        {
            return await Mediator.Send(new List.Query(limit, offset));
        }
        // [HttpGet]
        // public async Task<ActionResult<List<MessageDto>>> GetMessagesForUser()//[FromQuery] MessageParams messageParams
        // {
        //     return await Mediator.Send(new GetMessagesForUser.Query());//messageParams
        // }

        [HttpGet("thread/{messageThread}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string messageThread)
        {
            return await Mediator.Send(new GetMessageThread.Query(messageThread));
        }
       
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

    }
}