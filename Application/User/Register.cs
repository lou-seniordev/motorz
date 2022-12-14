using System;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest
        {
            public string DisplayName { get; set; }

            public string UserName { get; set; }

            public string Email { get; set; }

            public string Password { get; set; }

            public string Origin { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName)
                    .NotEmpty()
                    .MinimumLength(3)
                    .WithMessage("DisplayName must be at least 3 characters");
                RuleFor(x => x.UserName)
                    .NotEmpty()
                    .MinimumLength(3)
                    .WithMessage("UserName must be at least 3 characters");
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            private readonly UserManager<AppUser> _userManager;

            private readonly IEmailSender _emailSender;

            public Handler(
                IEmailSender emailSender,
                DataContext context,
                UserManager<AppUser> userManager
            )
            {
                _emailSender = emailSender;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit>
            Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                    throw new RestException(HttpStatusCode.BadRequest,
                        new { Email = "Email already exists" });

                if (
                    await _context
                        .Users
                        .AnyAsync(x => x.UserName == request.UserName)
                )
                    throw new RestException(HttpStatusCode.BadRequest,
                        new { UserName = "UserName already exists" });

                var rank =  _context.Ranks.FirstOrDefault(m => m.Id == "new-member");


                var user =
                    new AppUser
                    {
                        DisplayName = request.DisplayName,
                        Email = request.Email,
                        UserName = request.UserName,
                        DateOfBirth = DateTime.Now.AddYears(-1000),
                        Rank = rank
                    };


                var result =
                    await _userManager.CreateAsync(user, request.Password);

                if (!result.Succeeded)
                    throw new Exception("Problem creating user  ");

                var roleResult = await _userManager.AddToRoleAsync(user, "Member");
                
                if(!roleResult.Succeeded)
                    throw new RestException(HttpStatusCode.BadRequest, new {AppRole = "Not added to role"});

                var token =
                    await _userManager
                        .GenerateEmailConfirmationTokenAsync(user);

                token =
                    WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

                var verifyUrl =
                    $"{request.Origin}/user/verifyEmail?token={token}&email={request.Email}";

                var message =
                    $"<p>Please click the link below to verify your email address:</p><p><a href='{verifyUrl}'>{verifyUrl}</a></p>";

                await _emailSender
                    .SendEmailAsync(request.Email,
                    "Please verify email address",
                    message);

                return Unit.Value;
            }
        }
    }
}
