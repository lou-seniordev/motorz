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
        public class Command : IRequest<PrivateMessageDto>//<MessageDto>
        {
            public string RecipientUsername { get; set; }
            public string PrivateMessageThreadId { get; set; }
            public string Content { get; set; }
            public string Username { get; set; }


        }
        // public class CommandValidator : AbstractValidator<Command, PrivateMessageDto>
        // {
        //     public CommandValidator()
        //     {
        //         RuleFor(x => x.RecipientUsername).NotEmpty();
        //         RuleFor(x => x.Content).NotEmpty();

        //     }
        // }
        public class Handler : IRequestHandler<Command, PrivateMessageDto>//, MessageDto
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, 
            IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<PrivateMessageDto> Handle(Command request, CancellationToken cancellationToken)
            {

                // var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user.UserName.ToLower() == request.RecipientUsername.ToLower())
                {
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Message = "Can't send messages to yourself" });
                }
                var sender = await _context.Users.SingleOrDefaultAsync(x => x.UserName == user.UserName);
                var recipient = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.RecipientUsername);
                // var sender = await _context.Users.FirstOrDefaultAsync(x => x.UserName == user.UserName);
                // var recipient = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.RecipientUsername);

                if (recipient == null)

                {
                    throw new Exception("User recipient not found");
                }


                var privateMessage = new PrivateMessage
                {
                    Sender = sender,
                    Recipient = recipient,
                    SenderUsername = sender.UserName,
                    RecipientUsername = recipient.UserName,
                    Content = request.Content
                };



                if (string.IsNullOrEmpty(request.PrivateMessageThreadId) )
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
                    if(messageThread == null)
                        throw new RestException(HttpStatusCode.NotFound, new { MessageThread = "Not found"});

                    messageThread.PrivateMessages.Add(privateMessage);
                    messageThread.DateUpdated = DateTime.Now;
                    _context.PrivateMessageThreads.Update(messageThread);
                }


                _context.PrivateMessages.Add(privateMessage);

                var success = await _context.SaveChangesAsync() > 0;

                if(success ) return _mapper.Map<PrivateMessageDto>(privateMessage);

                throw new Exception("Problem Saving Changes");

            }

        }
    }
}