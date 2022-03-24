using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;
using Application.Validators;
using System.Collections.Generic;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }

            public class Handler : IRequestHandler<Command, User>
            {
                private readonly IJwtGenerator _jwtGenerator;
                private readonly DataContext _context;
                private readonly UserManager<AppUser> _userManager;
                public Handler(DataContext context, UserManager<AppUser> userManager,
                IJwtGenerator jwtGenerator)
                {
                    _userManager = userManager;
                    _jwtGenerator = jwtGenerator;
                    _context = context;

                }

                public async Task<User> Handle(Command request, CancellationToken cancellationToken)
                {


                    if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                        throw new RestException(HttpStatusCode.BadRequest,
                        new { Email = "Email already exists" });

                    if (await _context.Users.AnyAsync(x => x.UserName == request.UserName))
                        throw new RestException(HttpStatusCode.BadRequest,
                        new { UserName = "UserName already exists" });

                    // private ICollection refreshTokens = new Collection<RefreshToken>();
                    var user = new AppUser
                    {
                        DisplayName = request.DisplayName,
                        Email = request.Email,
                        UserName = request.UserName,
                    };

                    
                    // var refreshToken = _jwtGenerator.GenerateRefreshToken();
                    // refreshToken.AppUser = user;

                    // var x = new Domain.RefreshToken {
                    //     Id = refreshToken.Id,
                    //     Token = refreshToken.Token,
                    //     AppUser = user,
                    //     Expires = refreshToken.Expires,
                       
                    // };

                    // var y = new List<Domain.RefreshToken>();
                    // user.RefreshTokens = y;
                    // y.Add(refreshToken);
                    

                    // user.RefreshTokens.Add(refreshToken);

                    var result = await _userManager.CreateAsync(user, request.Password);

                    if (result.Succeeded)
                    {
                        // return new User(user, _jwtGenerator, refreshToken.Token);
                        return new User
                        {
                            DisplayName = user.DisplayName,
                            Token = _jwtGenerator.CreateToken(user),
                            Username = user.UserName,
                        };
                    }

                    throw new Exception("Problem creating user  ");
                }
            }
        }
    }
}