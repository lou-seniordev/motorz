using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseController
    {
        [HttpGet("{Username}")]
        public async Task<ActionResult<Profile>> Get(string username)
        {
            return await Mediator.Send(new Details.Query{Username = username});
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> Edit(Edit.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{username}/activities")]
        public async Task<ActionResult<List<UserActivityDto>>> GetUserActivities (string username, string predicate)
        {
            return await Mediator.Send(new ListActivities.Query{Username = username, Predicate = predicate});
        }

        [HttpGet("{username}/motofies")]
        public async Task<ActionResult<List<UserMotofyDto>>> GetUserMotofies (string username, string predicate)
        {
            return await Mediator.Send(new ListMotofies.Query{Username = username, Predicate = predicate});
        }
        
        [HttpGet("{username}/forumposts")]
        public async Task<ActionResult<List<UserForumpostDto>>> GetUserForumposts (string username, string predicate)
        {
            return await Mediator.Send(new ListForumposts.Query{Username = username, Predicate = predicate});
        }
        [HttpGet("{username}/mechanics")]
        public async Task<ActionResult<List<UserMechanicDto>>> GetUserMechanics (string username, string predicate)
        {
            return await Mediator.Send(new ListMechanics.Query{Username = username, Predicate = predicate});
        }
        
        [HttpGet("{username}/products")]
        public async Task<ActionResult<List<UserProductDto>>> GetUserProducts (string username, string predicate)
        {
            return await Mediator.Send(new ListProducts.Query{Username = username, Predicate = predicate});
        }
        
    }
}