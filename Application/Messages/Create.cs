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



namespace Application.Messages
{
    public class Create
    {
        public class Command : IRequest<MessageDto>
        {
            // public Guid Id { get; set; }
            public string RecipientUsername { get; set; }
            public string Content { get; set; }


        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.RecipientUsername).NotEmpty();
                RuleFor(x => x.Content).NotEmpty();

            }
        }
        public class Handler : IRequestHandler<Command, MessageDto>
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

            public async Task<MessageDto> Handle(Command request, CancellationToken cancellationToken)
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
                    return null;
                    throw new Exception("User not found");
                }

                var message = new Message
                {
                    Sender = sender,
                    Recipient = recipient,
                    SenderUsername = sender.UserName,
                    RecipientUsername = recipient.UserName,
                    Content = request.Content
                };

                _context.Messages.Add(message);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<MessageDto>(message);

                throw new Exception("Problem Saving Changes");

            }

        }
    }
}