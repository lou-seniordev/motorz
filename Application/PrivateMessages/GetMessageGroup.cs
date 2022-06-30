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
    public class GetMessageGroup
    {
        public class Query : IRequest<Group>
        {
            public string GroupName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Group>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Group> Handle(Query request, CancellationToken cancellationToken)
            {


                // var group = await _context.Groups.Include(x => x.Connections)
                // .FirstOrDefaultAsync(x => x.Name == request.GroupName);

                // if (group == null)
                //     throw new RestException(HttpStatusCode.NotFound,
                //         new { group = "Not Found" });

                // return group;

                return await _context.Groups
                    .Include(x => x.Connections)
                    .FirstOrDefaultAsync(x => x.Name == request.GroupName);
            }
        }
    }
}