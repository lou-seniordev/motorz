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
    public class AddCustomer
    {
        public class Command : IRequest
        {
            
            public Guid MechanicId { get; set; }
            public bool IsCustomer { get; set; } 


        }
        #region 
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.MechanicId).NotEmpty();
                RuleFor(x => x.IsCustomer).NotEmpty();
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

                var checkCustomer = await _context.UserMechanics.SingleOrDefaultAsync(
                    x => x.AppUserId == user.Id && x.MechanicId == request.MechanicId
                );

                if(checkCustomer is object)
                {
                    throw new Exception("Customer Is Already In The Database");
                }

                var customer = new UserMechanic
                {
                    AppUserId = user.Id,
                    MechanicId = request.MechanicId,
                    IsCustomer = request.IsCustomer,
                    IsOwner = !request.IsCustomer,
                    DateBecameCustomer = DateTime.Now
                };
                
                _context.UserMechanics.Add(customer);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}