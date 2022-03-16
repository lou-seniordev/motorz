using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.PrivateMessages;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using System.Net.Http;
using System;

namespace API.Controllers
{
    public class PrivateMessagesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.PrivateMessagesEnvelope>> List(int? limit, int? offset)
        {
            return await Mediator.Send(new List.Query(limit, offset));
        }

        // [HttpPost]
        // public async Task<ActionResult<Unit>> Create(Create.Command command)
        // {
        //     return await Mediator.Send(command);
        // }
    }
}