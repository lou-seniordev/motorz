using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Brands;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    // [Route("api/[controller]")]
    // [ApiController]
    public class BrandsController : BaseController
    {
    

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<Brand>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<Brand>> Details(Guid id)
        // {
        //     return await Mediator.Send(new Details.Query { Id = id });
        // }
    }
}