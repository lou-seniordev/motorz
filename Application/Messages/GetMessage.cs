using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages
{
    public class GetMessage
    {
           public class Query : IRequest<Message>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Message>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Message> Handle(Query request, CancellationToken cancellationToken)
            {
               // === Lazy loading ===
                var message = await _context.Messages
                .FindAsync(request.Id);

                if (message == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Message = "NotFound" });

                return message;
            }
        }
    }
}