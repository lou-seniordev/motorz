using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Motofies
{
    public class Unembrace
    {
           public class Command : IRequest
        {
            public Guid Id { get; set; }
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

                var motofy = await _context.Motofies.FindAsync(request.Id);

                if (motofy == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Motofy = "Could not find motofy" });

                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { User = "Could not find user" });

                var embrace = await _context.UserMotofies
                    .SingleOrDefaultAsync(
                        x => x.MotofyId == motofy.Id && 
                        x.AppUserId == user.Id);


                if(embrace == null) 
                    return Unit.Value;

                if(embrace.IsOwner)
                    throw new RestException(HttpStatusCode.BadRequest, 
                    new {Attendance = "You cannot remove your embrace"});

                _context.UserMotofies.Remove(embrace);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}