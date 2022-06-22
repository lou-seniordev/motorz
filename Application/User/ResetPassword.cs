using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace Application.User
{
    public class ResetPassword
    {
        public class Command : IRequest<IdentityResult>
        {
        
            public string Email { get; set; }
            public string Token { get; set; }
            public string Password { get; set; }

        }

        public class QueryValidator : AbstractValidator<Command>
        {
            public QueryValidator()
            {

                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Token).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
                
            }
        }

        public class Handler : IRequestHandler<Command, IdentityResult>
        {
            private readonly UserManager<AppUser> _userManager;
            public Handler(UserManager<AppUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<IdentityResult> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                var decodedTokenBytes = WebEncoders.Base64UrlDecode(request.Token);
                var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

                return await _userManager.ResetPasswordAsync(user, decodedToken, request.Password);

            }
        }
    }
}