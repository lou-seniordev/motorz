using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Mechanics;
using System;
using MediatR;

namespace API.Controllers
{
    public class MechanicsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.MechanicsEnvelope>> List(int?  limit, int? offset,
            bool isCustomer, bool isClose, bool mostRecommended, bool bestRated, string country, string search)
        {
            return await Mediator.Send(new List.Query(limit, offset, isCustomer, isClose, mostRecommended, 
            bestRated, country, search));
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
        [HttpPut("rate")]
        public async Task<ActionResult<Unit>> Rate(Rate.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpPut("addtestimonial")]
        public async Task<ActionResult<Unit>> AddTestimonial(AddTestimonial.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpPut("recommend")]
        public async Task<ActionResult<Unit>> Recommend( Recommend.Command command)
        {
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