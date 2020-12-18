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

namespace Application.Forumposts
{
    public class Details
    {
        public class Query : IRequest<ForumpostDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ForumpostDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ForumpostDto> Handle(Query request, CancellationToken cancellationToken)
            {
                // === Eager loading -> this plus virtual keyword ===
                // var activity = await _context.Activities
                // .Include(x => x.UserActivities)
                // .ThenInclude(x => x.AppUser)
                // .SingleOrDefaultAsync(x => x.Id == request.Id);
               
               // === Lazy loading ===
                var forumpost = await _context.Forumposts
                .FindAsync(request.Id);

                if (forumpost == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { activity = "NotFound" });

                var forumpostToReturn = _mapper.Map<Forumpost, ForumpostDto>(forumpost);


              
                return forumpostToReturn;
            }
        }
    }
}