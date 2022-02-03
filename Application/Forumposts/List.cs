using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Forumposts
{
    public class List
    {
        public class ForumpostEnvelope
        {
            public List<ForumpostDto> Forumposts { get; set; }
            public int ForumpostCount { get; set; }
        }

        public class Query : IRequest<ForumpostEnvelope>
        {

            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        public class Handler : IRequestHandler<Query, ForumpostEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ForumpostEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {

                var queryable = _context.Forumposts.AsQueryable();

                
                var forumposts = await queryable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3)
                .ToListAsync();
               
               
                return new ForumpostEnvelope 
                {
                    Forumposts = _mapper.Map<List<Forumpost>, List<ForumpostDto>>(forumposts),
                    ForumpostCount = queryable.Count()
                };
                
            }


        }
    }
}