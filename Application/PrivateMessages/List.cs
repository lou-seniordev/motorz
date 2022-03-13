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

namespace Application.PrivateMessages
{
    public class List
    {
        public class PrivateMessagesEnvelope
        {
            public List<PrivateMessageDto> PrivateMessages { get; set; }
            public int PrivateMessageThreadsCount { get; set; }
            public double TotalPages { get; set; }
        }

        public class Query : IRequest<PrivateMessagesEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        public class Handler : IRequestHandler<Query, PrivateMessagesEnvelope>
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
            public async Task<PrivateMessagesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {

                var username = _userAccessor.GetCurrentUsername();

                var queryable = _context.PrivateMessageThreads.AsQueryable();

                var threadsToCount = await queryable
                     .Where(x => x.PrivateMessages
                     .Any(u => u.RecipientUsername == username || u.SenderUsername == username))
                     .Where(x => (x.InitUsername == username && x.InitDeleted == false)
                        || (x.ReceiverUsername == username && x.ReceiverDeleted == false))
                     .OrderByDescending(o => o.DateUpdated)
                     .ToListAsync();

                var threadsToReturn = await queryable
                     .Where(x => x.PrivateMessages
                     .Any(u => u.RecipientUsername == username || u.SenderUsername == username))
                     .Where(x => (x.InitUsername == username && x.InitDeleted == false)
                        || (x.ReceiverUsername == username && x.ReceiverDeleted == false))
                     .OrderByDescending(o => o.DateUpdated)
                     .Skip(request.Offset ?? 0)
                     .Take(request.Limit ?? 3)
                     .ToListAsync();

                var messages = new List<PrivateMessage>();

                for (int i = 0; i < threadsToReturn.Count; i++)
                {
                    foreach (var message in threadsToReturn[i].PrivateMessages)
                    {
                        messages.Add(message);
                    }
                }

                double media =  ((double)threadsToCount.Count()/(double)( request.Limit ?? 3));


                return new PrivateMessagesEnvelope
                {
                    PrivateMessages = _mapper.Map<List<PrivateMessage>, List<PrivateMessageDto>>(messages),
                    PrivateMessageThreadsCount = threadsToCount.Count(),
                    TotalPages = Math.Ceiling(media)
                };

            }

        }
    }
}



