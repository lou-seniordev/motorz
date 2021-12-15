using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Brands;
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
        public async Task<ActionResult<List<BrandToSelectDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
    }
}