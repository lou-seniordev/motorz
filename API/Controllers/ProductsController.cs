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
        // [Authorize]
        public async Task<ActionResult<Product>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
    }
}