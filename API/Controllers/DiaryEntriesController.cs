using System;
using System.Threading.Tasks;
using Application.DiaryEntries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Route("api/[controller]")]
    // [ApiController]
    public class DiaryEntriesController : BaseController
    {

        [HttpGet("{id}")]
        // [Authorize]
        public async Task<ActionResult<DiaryEntryDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromForm]Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPut("{id}")]
        // [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
        
    }
}