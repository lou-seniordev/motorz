using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Messages;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using System.Net.Http;
using System;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseController
    {

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<List<MessageDto>>> GetMessagesForUser()
        {
            return await Mediator.Send(new GetMessagesForUser.Query());
        }
        // [HttpGet]
        // public async Task<ActionResult<List<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        // {
        //     return await Mediator.Send(new GetMessagesForUser.Query(messageParams));
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