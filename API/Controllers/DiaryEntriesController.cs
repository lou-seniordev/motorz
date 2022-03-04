using System;
using System.Threading.Tasks;
// using Application.DiaryEntries;
using Application.DiaryEntries;
using MediatR;
// using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Route("api/[controller]")]
    // [ApiController]
    public class DiaryEntriesController : BaseController
    {

        // [HttpGet]
        // public async Task<ActionResult<List.ActivitiesEnvelope>> List(int? limit, int? offset, 
        //     bool isGoing, bool isHost, bool iFollow, DateTime? startDate, string search)
        // {
        //     return await Mediator.Send(new List.Query(limit, offset, isGoing, isHost, iFollow, startDate, search));
        // }

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

        // [HttpPut("{id}")]
        // // [Authorize(Policy = "IsActivityHost")]
        // public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        // {
        //     command.Id = id;
        //     return await Mediator.Send(command);
        // }
        
    }
}