using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Mechanics;
using System;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class MechanicsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<MechanicDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        // [Authorize]
        public async Task<ActionResult<MechanicDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromForm]Create.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpPost("addcustomer")]
        public async Task<ActionResult<Unit>> AddCustomer(AddCustomer.Command command)
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
        // [HttpPut("{id}/rate")]
        [HttpPut("rate")]
        public async Task<ActionResult<Unit>> Rate(
            // Guid id, 
            Rate.Command command)
        {
            // command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        // [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}