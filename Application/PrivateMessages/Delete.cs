using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.PrivateMessages
{
    public class Delete
    {
        public class Command : IRequest<MessageToDeleteDto>
        {
            public Guid Id { get; set; }
            public Guid PrivateMessageThreadId { get; set; }

        }

        public class Handler : IRequestHandler<Command, MessageToDeleteDto>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<MessageToDeleteDto> Handle(Command request, CancellationToken cancellationToken)
            {

                var message = await _context.PrivateMessages.FindAsync(request.Id);

                if (message == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Message = "Message Not Found" });

                _context.Remove(message); 
            
                var success = await _context.SaveChangesAsync() > 0;

                var messageToDelete = new  MessageToDeleteDto 
                {
                    Id = request.Id,
                    PrivateMessageThreadId = request.PrivateMessageThreadId
                    // Id = message.Id,
                    // PrivateMessageThreadId = message.PrivateMessageThread.Id
                };

                // if (success) return Unit.Value;
                if (success) return messageToDelete;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}