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

namespace Application.PrivateMessages
{
    public class GetConnection
    {
        public class Query : IRequest<Connection>
        {
            public string ConnectionId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Connection>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Connection> Handle(Query request, CancellationToken cancellationToken)
            {

                var connection = await _context.Connections
                .FindAsync(request.ConnectionId);

                if (connection == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { connection = "NotFound" });

                return connection;
            }
        }
    }
}