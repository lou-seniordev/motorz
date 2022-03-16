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

namespace Application.Messages
{
    public class Create
    {
        public class Command : IRequest<MessageDto>//<MessageDto>
        {
            // public Guid Id { get; set; }
            public string RecipientUsername { get; set; }
            public string ProductId { get; set; }
            public string MessageThreadId { get; set; }
            public string Content { get; set; }
            public string Username { get; set; }


        }
        // public class CommandValidator : AbstractValidator<Command>
        // {
        //     public CommandValidator()
        //     {
        //         // RuleFor(x => x.ProductId).NotEmpty();
        //         RuleFor(x => x.RecipientUsername).NotEmpty();
        //         RuleFor(x => x.Content).NotEmpty();

        //     }
        // }
        public class Handler : IRequestHandler<Command, MessageDto>//, MessageDto
        {
            private readonly DataContext _context;
            // private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                // _userAccessor = userAccessor;
                _context = context;

            }

            // public async Task<MessageDto> Handle(Command request, CancellationToken cancellationToken)
            public async Task<MessageDto> Handle(Command request, CancellationToken cancellationToken)
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

                if (recipient == null)

                {
                    throw new Exception("Recipient user not found");
                }


                var message = new Message
                {
                    Sender = sender,
                    Recipient = recipient,
                    SenderUsername = sender.UserName,
                    RecipientUsername = recipient.UserName,
                    Content = request.Content,
                };



                if (request.MessageThreadId == null)
                {
                    var messageThreadId = Guid.NewGuid();
                    var newMessageThread = new MessageThread
                    {
                        Id = messageThreadId,
                        Messages = new List<Message>(),
                        InitUsername = user.UserName,
                        ReceiverUsername = request.RecipientUsername,
                        DateUpdated = DateTime.Now
                    };
                    newMessageThread.Messages.Add(message);
                    _context.MessageThreads.Add(newMessageThread);

                }
                else
                {
                    var messageThread = await _context.MessageThreads.SingleOrDefaultAsync(
                        x => x.Id == Guid.Parse(request.MessageThreadId));
                    messageThread.Messages.Add(message);
                    messageThread.DateUpdated = DateTime.Now;
                    _context.MessageThreads.Update(messageThread);
                }


                _context.Messages.Add(message);

                if (request.ProductId != null)//)!string.IsNullOrEmpty(
                {

                    var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == Guid.Parse(request.ProductId));
                    if (product == null)

                    {
                        throw new Exception("Product not found");
                    }

                    product.Messages.Add(message);

                    _context.Products.Update(product);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<MessageDto>(message);
                // if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");

            }

        }
    }
}