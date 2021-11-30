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
            public string _productId { get; set; }// = "d938c1d0-3321-4357-b7c3-d5144c4eeb68";
            public string _username { get; set; }// = "jane";
            public Query(string username, string productId)
            {
                _productId = productId;
                _username = username;
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
            public async Task<ActionResult<IEnumerable<MessageDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUsername = _userAccessor.GetCurrentUsername();
                // var productId = request._productId;

                var messages = await _context.Messages
                    .Include(u => u.Sender).ThenInclude(p => p.Photos)
                    .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                   
                    .Where(  
                        m => m.Recipient.UserName == currentUsername
                        &&
                        // m.Sender.UserName == request._username
                        m.Sender.UserName == currentUsername
                        // || 
                        // m.username == request._recipientUsername
                        // && 
                        // m.Sender.UserName == currentUsername
                        
                    ).Where(
                        m => m.Product.Id == Guid.Parse(request._productId)
                    )
                    // .Where(u => u.)
                    .OrderBy(m => m.DateSent)
                    .ToListAsync();

                // var selectedProductIds = messages.GroupBy(pid => pid.Product.Id).Select(grp => grp.First().Product.Id);

                // var sortedMessagesByProductId = new List<MessageThreadDto>();

                
                // foreach (var id in selectedProductIds)
                // {
                //     foreach(var item in messages)
                //     {
                //         if(id == item.Product.Id)
                //         {
                //         //    sortedMessagesByProductId.Add(new List<Message>() {
                //         //     //    new Message = item;
                //         //    });
                //         }
                //     }
                // }

                // var probableSolution = messages.GroupBy(pid => pid.Product.Id).ToDictionary(
                //     grp => grp.Key,
                //     grp => grp.ToList()
                // );

                var thread = messages.Where(m => m.Product.Id == Guid.Parse(request._productId));
                
                // var unreadMessages = messages
                //     .Where(m => m.DateRead == null && m.Recipient.UserName == currentUsername)
                //     .ToList();

                // if (unreadMessages.Any())
                // {
                //     foreach (var message in unreadMessages)
                //     {
                //         message.DateRead = DateTime.Now;
                //     }

                //     await _context.SaveChangesAsync();
                // }

                return (_mapper.Map<IEnumerable<MessageDto>>(thread)).ToList();

            }


        }
    }
}