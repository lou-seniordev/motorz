using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using FluentValidation;

namespace Application.Mechanics
{
    public class Rate
    {
        public class Command : IRequest
        {
            public string Id { get; set; }

            public string Score { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Score).NotEmpty();

            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor//, 
            )
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {


                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var mechanic = await _context.Mechanics.SingleOrDefaultAsync(x => x.Id == Guid.Parse(request.Id));

                if (mechanic is null)
                {
                    throw new Exception("Mechanic Does Not Exist!");
                }

                var customer = await _context.UserMechanics.SingleOrDefaultAsync(
                    x => x.AppUserId == user.Id && x.MechanicId == mechanic.Id
                );

                if (customer is object)
                {

                    mechanic.Ratings.Add(new Rating
                    {
                        User = user,
                        Score = int.Parse(request.Score)
                    });

                    int count = 0;
                    double sum = 0;
                    double result = 0;

                    foreach (var score in mechanic.Ratings)
                    {
                        sum += score.Score;
                        count++;
                    }
                    result = sum / count;
                    if (mechanic.AverageRating != null)
                    {
                        mechanic.AverageRating.Count = count;
                        mechanic.AverageRating.Average = Math.Round(result, 2);
                    } 
                    else
                    {
                        var averageRating = new AverageRating{
                            Id = new Guid(),
                        };
                        mechanic.AverageRating = averageRating;
                        mechanic.AverageRating.Count = count;
                        mechanic.AverageRating.Average = Math.Round(result, 2);
                    }


                    _context.Mechanics.Update(mechanic);

                    var success = await _context.SaveChangesAsync() > 0;

                    if (success) return Unit.Value;

                    throw new Exception("Problem Saving Changes");
                }
                else
                {
                    throw new Exception("Only Customers Can Rate A Mechanic!");

                }
            }
        }
    }
}