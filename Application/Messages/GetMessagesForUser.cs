using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Interfaces;



namespace Application.Messages
{
    public class GetMessagesForUser
    {

        public class Query : IRequest<List<MessageDto>>
        {
            public Query(MessageParams messageParams)
            {
                this.messageParams = messageParams;
            }

            public MessageParams messageParams { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<MessageDto>>
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
            public async Task<List<MessageDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                request.messageParams.Username = _userAccessor.GetCurrentUsername();

                var query = _context.Messages
                     .OrderByDescending(m => m.DateSent)
                     .AsQueryable();

                //==new_switch==
                query = request.messageParams.Container switch
                {
                    "Inbox" => query.Where(u => u.Recipient.UserName == request.messageParams.Username),
                    "Outbox" => query.Where(u => u.Sender.UserName == request.messageParams.Username),
                    _ => query.Where(u => u.Recipient.UserName
                        == request.messageParams.Username && u.DateRead == null)
                };


                var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider).ToListAsync();

                return await messages;
               
            }


        }
    }
}