using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Products;
using System;

namespace API.Controllers
{
    public class ProductsController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<Product>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Create([FromForm] Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("{id}/toogleActivation")]
        [Authorize]
        public async Task<ActionResult<Unit>> ToogleActivate(Guid id)
        {
            return await Mediator.Send(new ToogleActivate.Command {Id = id});
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Edit(Guid id, [FromForm] Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPut("{id}/updatePhoto")]
        [Authorize]
        public async Task<ActionResult<Unit>> UpdatePhoto(Guid id, [FromForm] UpdatePhoto.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}