using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Forumposts;
using System;
using MediatR;

namespace API.Controllers
{
    // [Route("api/[controller]")]
    // [ApiController]
    public class ForumpostsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.ForumpostEnvelope>> List(int? limit, int? offset, 
            bool trending, bool iAsked, bool iRated, string category, string search)
        {
            return await Mediator.Send(new List.Query(limit, offset, trending, iAsked, iRated, category, search ));
        }

        [HttpGet("{id}")]
        // [Authorize]
        public async Task<ActionResult<ForumpostDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody]Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        // [Authorize(Policy = "IsForumpostOwner")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        // [Authorize(Policy = "IsForumpostOwner")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPut("rate")]
        public async Task<ActionResult<Unit>> Rate(Rate.Command command)
        {
            return await Mediator.Send(command);
        }

 

    }
}