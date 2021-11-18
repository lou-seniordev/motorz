using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Messages;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController: BaseController
    {

        [HttpPost]
        public async Task<ActionResult<MessageDto>> Create([FromBody]Create.Command command)//
        {
            return await Mediator.Send(command);
        }

        [HttpGet]// FromBody
        public async Task<ActionResult<List<MessageDto>>> GetMessagesForUser ([FromQuery]MessageParams messageParams)
        {
            return await Mediator.Send(new GetMessagesForUser.Query(messageParams));
        }
        
        [HttpGet("thread/{username}")]// FromBody
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread (string username)
        {
            return await Mediator.Send(new GetMessageThread.Query(username));
        }
    }
}