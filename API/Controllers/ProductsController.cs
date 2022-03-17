using System.Threading.Tasks;
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
        public async Task<ActionResult<List.ProductsEnvelope>> List(int? limit, int? offset, 
            string country, string brand, string category, bool iFollow, bool iView, bool myProducts, string search)
        {
            return await Mediator.Send(new List.Query(
                limit, offset, country, brand, category, iFollow, iView, myProducts, search));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> Details(Guid id)
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
        [HttpPut("{id}/visitCounter")]
        [Authorize]
        public async Task<ActionResult<Unit>> IncreaseNumberSeen(Guid id)
        {
            return await Mediator.Send(new IncreaseNumberSeen.Command {Id = id});
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)//[FromForm] 
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPut("{id}/follow")]
        [Authorize]
        public async Task<ActionResult<Unit>> Follow(Guid id)
        {
            return await Mediator.Send(new Follow.Command {Id = id});
        }

        [HttpPut("{id}/markSold")]
        [Authorize]
        public async Task<ActionResult<Unit>> MarkSold(Guid id)
        {
            return await Mediator.Send(new MarkSold.Command {Id = id});
        }

        [HttpDelete("{id}/unfollow")]
        [Authorize]
        public async Task<ActionResult<Unit>> Unfollow(Guid id)
        {
            return await Mediator.Send(new Unfollow.Command {Id = id});
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