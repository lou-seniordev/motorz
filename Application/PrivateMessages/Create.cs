using System;
using System.Threading;
using System.Threading.Tasks;
using System.Net;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Application.Errors;
using System.Collections.Generic;

namespace Application.PrivateMessages
{
    public class Create
    {
        public class Command : IRequest//<MessageDto>
        {
            public string RecipientUsername { get; set; }
            public string PrivateMessageThreadId { get; set; }
            public string Content { get; set; }


        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.RecipientUsername).NotEmpty();
                RuleFor(x => x.Content).NotEmpty();

            }
        }
        public class Handler : IRequestHandler<Command>//, MessageDto
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;

            }

            // public async Task<MessageDto> Handle(Command request, CancellationToken cancellationToken)
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                if (user.UserName.ToLower() == request.RecipientUsername.ToLower())
                {
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Message = "Can't send messages to yourself" });
                }
                var sender = await _context.Users.FirstOrDefaultAsync(x => x.UserName == user.UserName);
                var recipient = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.RecipientUsername);

                if (recipient == null)

                {
                    throw new Exception("User not found");
                }


                var privateMessage = new PrivateMessage
                {
                    Sender = sender,
                    Recipient = recipient,
                    SenderUsername = sender.UserName,
                    RecipientUsername = recipient.UserName,
                    Content = request.Content,
                };



                if (request.PrivateMessageThreadId == null)
                {
                    var messageThreadId = Guid.NewGuid();
                    var newPrivateMessageThread = new PrivateMessageThread
                    {
                        Id = messageThreadId,
                        PrivateMessages = new List<PrivateMessage>(),
                        InitUsername = user.UserName,
                        ReceiverUsername = request.RecipientUsername,
                        DateUpdated = DateTime.Now
                    };
                    newPrivateMessageThread.PrivateMessages.Add(privateMessage);
                    _context.PrivateMessageThreads.Add(newPrivateMessageThread);

                }
                else
                {
                    var messageThread = await _context.PrivateMessageThreads.SingleOrDefaultAsync(
                        x => x.Id == Guid.Parse(request.PrivateMessageThreadId));
                    messageThread.PrivateMessages.Add(privateMessage);
                    messageThread.DateUpdated = DateTime.Now;
                    _context.PrivateMessageThreads.Update(messageThread);
                }


                _context.PrivateMessages.Add(privateMessage);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");

            }

        }
    }
}