using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.MotofyPhotos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MotofyPhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<MotofyPhoto>> Add([FromForm]AddMotofyPhoto.Command command)
        {
            return await Mediator.Send(command);
        }

        // [HttpDelete("{id}")]
        // public async Task<ActionResult<Unit>> Delete (string id)
        // {
        //     return await Mediator.Send(new Delete.Command{Id = id});  
        // }

        // [HttpPost("{id}/setMain")]
        // public async Task<ActionResult<Unit>> SetMain(string id) 
        // {
        //     return await Mediator.Send(new SetMain.Command{Id = id}); 
        // }
    }
}