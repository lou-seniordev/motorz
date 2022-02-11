using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Interfaces;
using Domain;
using System;

namespace Application.Messages
{
    public class List
    {
        public class MessagesEnvelope
        {
            public List<MessageDto> Messages { get; set; }
            public int MessageThreadsCount { get; set; }
            public double TotalPages { get; set; }
        }

        public class Query : IRequest<MessagesEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        public class Handler : IRequestHandler<Query, MessagesEnvelope>
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
            public async Task<MessagesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {

                var username = _userAccessor.GetCurrentUsername();

                var queryable = _context.MessageThreads.AsQueryable();

                var threadsToCount = await queryable
                     .Where(x => x.Messages
                     .Any(u => u.RecipientUsername == username || u.SenderUsername == username))
                     .Where(x => (x.InitUsername == username && x.InitDeleted == false)
                        || (x.ReceiverUsername == username && x.ReceiverDeleted == false))
                     .OrderByDescending(o => o.DateUpdated)
                     .ToListAsync();

                var threadsToReturn = await queryable
                     .Where(x => x.Messages
                     .Any(u => u.RecipientUsername == username || u.SenderUsername == username))
                     .Where(x => (x.InitUsername == username && x.InitDeleted == false)
                        || (x.ReceiverUsername == username && x.ReceiverDeleted == false))
                     .OrderByDescending(o => o.DateUpdated)
                     .Skip(request.Offset ?? 0)
                     .Take(request.Limit ?? 3)
                     .ToListAsync();

                var messages = new List<Message>();

                for (int i = 0; i < threadsToReturn.Count; i++)
                {
                    foreach (var message in threadsToReturn[i].Messages)
                    {
                        messages.Add(message);
                    }
                }

                double media =  ((double)threadsToCount.Count()/(double)( request.Limit ?? 3));


                return new MessagesEnvelope
                {
                    Messages = _mapper.Map<List<Message>, List<MessageDto>>(messages),
                    MessageThreadsCount = threadsToCount.Count(),
                    TotalPages = Math.Ceiling(media)
                };

            }

        }
    }
}



