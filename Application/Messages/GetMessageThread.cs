using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Interfaces;
using System;
using Microsoft.AspNetCore.Mvc;

namespace Application.Messages
{
    public class GetMessageThread
    {
         public class Query : IRequest<ActionResult<IEnumerable<MessageDto>>>
        {

            public string RecipientUsername { get; set; }
            public Query(string recipientUsername)
            {
                this.RecipientUsername = recipientUsername;
            }

           
        }

        public class Handler : IRequestHandler<Query, ActionResult<IEnumerable<MessageDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }
            //
            public async Task<ActionResult< IEnumerable<MessageDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUsername = _userAccessor.GetCurrentUsername();

                var messages = await _context.Messages
                    .Include(u => u.Sender).ThenInclude(p => p.Photos)
                    .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                    .Where(
                        m => m.Recipient.UserName == currentUsername 
                        &&
                             m.Sender.UserName == request.RecipientUsername
                        ||   m.RecipientUsername == request.RecipientUsername
                        &&   m.Sender.UserName == currentUsername
                    )
                    .OrderBy(m => m.DateSent)
                    .ToListAsync();

                var unreadMessages = messages
                    .Where(m => m.DateRead == null && m.Recipient.UserName == currentUsername)
                    .ToList();

                if (unreadMessages.Any())
                {
                    foreach (var message in unreadMessages)
                    {
                        message.DateRead = DateTime.Now;
                    }

                    await _context.SaveChangesAsync();
                }

                return (_mapper.Map<IEnumerable<MessageDto>>(messages)).ToList();

            }


        }
    }
}