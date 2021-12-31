using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Mechanics
{
    public class Recommend
    {
        public class Command : IRequest
        {    
            public Guid MechanicId { get; set; }
        }
        #region 
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.MechanicId).NotEmpty();
            }
        }
        #endregion
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

                var mechanic = await _context.Mechanics.SingleOrDefaultAsync(
                    x => x.Id == request.MechanicId);

                if (mechanic is null)
                {
                    throw new Exception("Mechanic Does Not Exist!");
                }

                var userMechanic = await _context.UserMechanics.SingleOrDefaultAsync(
                    x => x.AppUserId == user.Id && x.MechanicId == request.MechanicId
                );

                if(userMechanic.CustomerRecommended == true)
                {
                    throw new Exception("Already Recommended!");
                }
                
                if(userMechanic.IsOwner == true)
                {
                    throw new Exception("You Cannot Recommend Your Own Businnes!");
                }

                userMechanic.CustomerRecommended = true;
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}