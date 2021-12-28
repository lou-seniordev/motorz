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
    public class AddTestimonial
    {
        public class Command : IRequest
        {
            
            public Guid MechanicId { get; set; }
            public string Text { get; set; } 


        }
        #region 
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.MechanicId).NotEmpty();
                RuleFor(x => x.Text).NotEmpty();
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

                if(userMechanic.Testimonial != null)
                {
                    throw new Exception("Testimonial Already Added");
                }

                var testimonial = new Testimonial
                {
                    // Id = new Guid(),
                    Text = request.Text,
                    DateAdded = DateTime.Now
                };

                userMechanic.Testimonial = testimonial;
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}