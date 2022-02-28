using System;
using System.Threading.Tasks;
using Application.Motofies;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MotofiesController: BaseController
    {
        [HttpGet]
        [AllowAnonymous]
         public async Task<ActionResult<List.MotofiesEnvelope>> List(int? limit, int? offset,
            bool bestRated, bool mostEmbraced, bool iEmbraced, bool iFollow, string search)
        {
            return await Mediator.Send(new List.Query(limit, offset, bestRated, mostEmbraced, iEmbraced, iFollow, search));
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<MotofyDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromForm]Create.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpPut("{id}")]
        [Authorize(Policy = "IsMotofyOwner")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
        [HttpPut("{id}/rate")]
        public async Task<ActionResult<Unit>> Rate(Guid id, Rate.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsMotofyOwner")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPost("{id}/embrace")]
        public async Task<ActionResult<Unit>> Embrace(Guid id)
        {
            return await Mediator.Send(new Embrace.Command{Id = id});
        }

        [HttpDelete("{id}/embrace")]
        public async Task<ActionResult<Unit>> Unembrace (Guid id)
        {
            return await Mediator.Send(new Unembrace.Command{Id = id});
        }
    }
}