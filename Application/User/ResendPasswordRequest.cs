using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace Application.User
{
    public class ResendPasswordRequest
    {
        public class Query : IRequest
        {
            public string Email { get; set; }
            public string Origin { get; set; }
        }

         public class Handler : IRequestHandler<Query>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IEmailSender _emailSender;
            public Handler(UserManager<AppUser> userManager, IEmailSender emailSender)
            {
                _emailSender = emailSender;
                _userManager = userManager;
            }

            public async Task<Unit> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

                var verifyUrl = $"{request.Origin}/user/ResetPasswordForm?token={token}&email={request.Email}";

                var message = $"<p>Please click the link we resent you to reset your password:</p><p><a href='{verifyUrl}'>{verifyUrl}></a></p>";

                await _emailSender.SendEmailAsync(request.Email, "Link to reset password resent", message);

                return Unit.Value;
            }

        }
    }
}