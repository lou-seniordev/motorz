using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using System.Linq;
using Application.Errors;
using System.Net;

namespace Application.Forumposts
{
    public class Rate
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public string Rating { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Rating).NotEmpty();

            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {


                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var forumpost = await _context.Forumposts.SingleOrDefaultAsync(x => x.Id == request.Id);

                int rating = 0;
                // string ratingLevel = "";

                if (forumpost == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { forumpost = "NotFound" });

                switch (request.Rating)
                {
                    case "Interesting":
                        {
                            rating = 1;
                            setRating(user, forumpost, rating);
                            break;
                        }
                    case "Usefull":
                        {
                            rating = 3;
                            setRating(user, forumpost, rating);
                            break;
                        }
                    case "Helping":
                        {
                            rating = 5;
                            setRating(user, forumpost, rating);
                            break;
                        }
                    default:
                        throw new RestException(HttpStatusCode.Conflict,
                           new { forumpost = "Not possible to rate" });
                }

                _context.Forumposts.Update(forumpost);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }

            private static void setRating(AppUser user, Forumpost forumpost, int rating)
            {
                var forumpostRating = new ForumpostRating();
                
                forumpostRating.Author = user;
                forumpostRating.Forumpost = forumpost;
                forumpostRating.Rating = rating;

                switch (rating)
                {
                    case 1:
                        forumpostRating.IsInteresting = true;
                        break;
                    case 3:
                        forumpostRating.IsUsefull = true;
                        break;
                    case 5:
                        forumpostRating.IsHelping = true;
                        break;
                    default:
                        throw new RestException(HttpStatusCode.Conflict,
                           new { forumpostRating = "Not possible establish level" });

                }

                forumpost.ForumpostRatings.Add(forumpostRating);

                if (forumpost.ForumpostRatings.Count() > 0)
                    forumpost.ForumpostRating
                    = forumpost.ForumpostRatings.Sum(x => x.Rating) / (double)forumpost.ForumpostRatings.Count();
                else
                    forumpost.ForumpostRating = rating;
            }
        }
    }
}