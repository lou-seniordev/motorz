using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.PrivateMessages
{
    public class Edit
    {
        public class Command : IRequest<MessageToEditDto>
        {
            public Guid Id { get; set; }
            public string PrivateMessageThreadId { get; set; }
            public string Content { get; set; }
            public string RecipientUsername { get; set; }
            public string Username { get; set; }
            public string SenderPhotoUrl { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.PrivateMessageThreadId).NotEmpty();
                RuleFor(x => x.Content).NotEmpty();
                RuleFor(x => x.RecipientUsername).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.SenderPhotoUrl).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, MessageToEditDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<MessageToEditDto> Handle(Command request, CancellationToken cancellationToken)
            {

                var message = await _context.PrivateMessages.FindAsync(request.Id);

                if (message == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Message = "Message Not Found" });

                message.Content = request.Content ?? message.Content;

                var success = await _context.SaveChangesAsync() > 0;

                var messageToEdit = new MessageToEditDto
                {
                    Id = request.Id,
                    Content = request.Content,
                    PrivateMessageThreadId = request.PrivateMessageThreadId,
                    RecipientUsername = request.RecipientUsername,
                    SenderUsername = request.Username,
                    SenderPhotoUrl = request.SenderPhotoUrl
                };

                if (success) return messageToEdit;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}