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

namespace Application.Messages
{
    public class List
    {
        public class MessagesEnvelope
        {
            public List<MessageDto> Messages { get; set; }
            public int MessagesCount { get; set; }

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
            //
            public async Task<MessagesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {

                var username = _userAccessor.GetCurrentUsername();

                var querable = _context.Messages
                     .Where(
                         u => u.RecipientUsername == username
                         ||
                         u.SenderUsername == username)
                     .OrderByDescending(m => m.DateSent)
                     .AsQueryable();

                 var messages = await querable
                    // .Skip(request.Offset ?? 0)
                    // .Take(request.Limit ?? 4)
                    .ToListAsync();

                return new MessagesEnvelope
                {
                    Messages = _mapper.Map<List<Message>, List<MessageDto>>(messages),
                    MessagesCount = querable.Count()
                };

            }

        }
    }
}



