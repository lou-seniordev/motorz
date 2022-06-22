using System.Threading.Tasks;
using Application.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {

            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register(Register.Command command)
        {
            command.Origin = Request.Headers["origin"];
            await Mediator.Send(command);
            return Ok("Registration successfull - please check your email");
        }
        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<ActionResult> VerifyEmail(ConfirmEmail.Command command)
        {

            var result = await Mediator.Send(command);
            if (!result.Succeeded) return BadRequest("Problem verifying email address");
            return Ok("Email confirmation successfull - you can now login");
        }

        [AllowAnonymous]
        [HttpGet("resendEmailVerification")]
        public async Task<ActionResult> ResendEmailVerification([FromQuery] ResendEmailVerification.Query query)
        {
            query.Origin = Request.Headers["origin"];
            await Mediator.Send(query);

            return Ok("Email verification link sent - please check email");
        }

        [AllowAnonymous]
        [HttpGet("handleForgottenPassword")]
        public async Task<ActionResult> HandleForgottenPassword([FromQuery]HandleForgottenPassword.Query query)
        {

            query.Origin = Request.Headers["origin"];
            var result = await Mediator.Send(query);
            return Ok("Please check your email for the password reset link");
        }

        [AllowAnonymous]
        [HttpPost("resetPassword")]
        public async Task<ActionResult> ResetPassword(ResetPassword.Command command)
        {

            var result = await Mediator.Send(command);
            if (!result.Succeeded) return BadRequest("Problem verifying email address");

            return Ok("Email confirmed - please enter the new password");
        }

        [AllowAnonymous]
        [HttpGet("resendPasswordRequest")]
        public async Task<ActionResult> ResendPasswordRequest([FromQuery] ResendPasswordRequest.Query query)
        {

            query.Origin = Request.Headers["origin"];
            await Mediator.Send(query);
            return Ok("Please check your email for the resent password reset link");
        }



        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }



    }
}