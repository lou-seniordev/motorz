using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Messages;



namespace API.Controllers
{
    public class MessagesController: BaseController
    {
        [HttpPost]
        public async Task<ActionResult<MessageDto>> Create([FromBody]Create.Command command)//
        {
            return await Mediator.Send(command);
        }
    }
}