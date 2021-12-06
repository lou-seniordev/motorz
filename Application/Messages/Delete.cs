using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;

namespace Application.Messages
{
    public class Delete
    {
        public class Command : IRequest
        {
            // public Query(MessageParams messageParams)
            // {
            //     this.messageParams = messageParams;
            // }
            public DeleteParams deleteParams { get; set; }

            // public Command(DeleteParams deleteParams)
            // {
            // }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                // //REMEMBER TO DELETE THE MESSAGETHREAD IF NECESSARY!!!
                // var message = await _context.Messages.FindAsync(request.Id);
                var ids = request.deleteParams.MessageThreadIds;

                foreach (var id in ids)
                {
                    var message = await _context.Messages.SingleOrDefaultAsync(x => x.Id == Guid.Parse(id));
                    if (message == null)
                        throw new RestException(HttpStatusCode.NotFound, new { Message = "Message NotFound" });
                    _context.Remove(message);
                }
                // var messagesToDelete = await _context.Messages.

                // if (message == null)
                //     throw new RestException(HttpStatusCode.NotFound,
                //         new { message = "NotFound" });

                // _context.Remove(message);

                var success = await _context.SaveChangesAsync() > 0;

                // if (success) 
                return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}