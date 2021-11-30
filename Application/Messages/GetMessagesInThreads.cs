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
    public class GetMessagesInThreads
    {
         public class Query : IRequest<ActionResult<IEnumerable<MessageThreadDto>>>
        {
            // public string _ThreadId { get; set; }// = "d938c1d0-3321-4357-b7c3-d5144c4eeb68";
            // public string _username { get; set; }// = "jane";
            public Query()//string username, string productId)
            {
                // _productId = productId;
                // _username = username;
            }
        }

        public class Handler : IRequestHandler<Query, ActionResult<IEnumerable<MessageThreadDto>>>
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
            public async Task<ActionResult<IEnumerable<MessageThreadDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUsername = _userAccessor.GetCurrentUsername();

                var messages = await _context.Messages
                    .Include(u => u.Sender).ThenInclude(p => p.Photos)
                    .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                    .Where(  
                        m => m.Recipient.UserName == currentUsername
                        ||
                        m.Sender.UserName == currentUsername   
                    )
                    .OrderBy(m => m.DateSent)
                    .ToListAsync();

                var selectedThreadIds = messages.GroupBy(pid => pid.MessageThread.Id).Select(grp => grp.First().Product.Id);

                // var messageDtos = _mapper.Map<IEnumerable<MessageDto>>(messages).ToList();

                // var messageThreads = await _context.MessageThreads.
                // return (_mapper.Map<IEnumerable<MessageDto>>(thread)).ToList();

                await _context.SaveChangesAsync();
                return null;

            }


        }
    }
}