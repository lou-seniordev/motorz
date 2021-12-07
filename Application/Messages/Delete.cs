using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;
using Domain;
using Application.Interfaces;
using System.Linq;

namespace Application.Messages
{
    public class Delete
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

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());


                var id = request.Id;

                var messages = await _context.Messages.Where(m => m.MessageThread.Id == id).ToListAsync();

                if (messages.Count() == 0)
                    throw new RestException(HttpStatusCode.NotFound, new { Messages = "Messages NotFound" });


                var messageThread = await _context.MessageThreads
                    .Include(u => u.Messages)
                    .SingleOrDefaultAsync(m => m.Id == id);

                if (messageThread == null)
                    throw new RestException(HttpStatusCode.NotFound, new { MessageThread = "MessageThread NotFound" });

                if (messageThread.InitUsername == user.UserName)
                {
                    messageThread.InitDeleted = true;
                }
                else if (messageThread.ReceiverUsername == user.UserName)
                {
                    messageThread.ReceiverDeleted = true;
                }

                if (messageThread.InitDeleted && messageThread.ReceiverDeleted)
                {
                    _context.Remove(messageThread);
                    for (int i=0; i<messages.Count(); i++)
                    {
                        _context.Remove(messages[i]);
                    }
                }
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
                





            }
        }
    }
}