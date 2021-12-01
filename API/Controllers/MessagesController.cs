using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Messages;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using MediatR;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController: BaseController
    {

        // [HttpPost]
        // public async Task<ActionResult<Unit>> Create(Create.Command command)//
        // // public async Task<ActionResult<MessageDto>> Create([FromQuery] string recipientUsername, string productId, string content)//
        // {
        //     return await Mediator.Send(command);
            
        //     // return await Mediator.Send(new Create.Command{ recipientUsername, productId, content});
        // }
        
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]// FromBody
        public async Task<ActionResult<List<MessageDto>>> GetMessagesForUser ([FromQuery]MessageParams messageParams)
        {
            return await Mediator.Send(new GetMessagesForUser.Query(messageParams));
        }
        
        [HttpGet("thread/{messageThread}")]// FromBody [FromQuery]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread (string messageThread)
        {
            return await Mediator.Send(new GetMessageThread.Query( messageThread));
        }
        // [HttpGet("messagethreads")]// FromBody [FromQuery]
        // public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThreads (string recipientUsername, string productId)
        // {
        //     return await Mediator.Send(new GetMessageThread.Query(recipientUsername, productId));
        // }
    }
}