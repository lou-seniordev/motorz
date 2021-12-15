using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Countries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CountriesController: BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<CountryToSelectDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
    }
}