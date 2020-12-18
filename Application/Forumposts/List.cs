using System.Collections.Generic;
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

        public class Query : IRequest<List<ForumpostDto>> { }

        public class Handler : IRequestHandler<Query, List<ForumpostDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<ForumpostDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // === Lazy loading ===
                var forumposts = await _context.Forumposts.ToListAsync();
                return _mapper.Map<List<Forumpost>, List<ForumpostDto>>(forumposts);

                // return forumposts;
            }


        }
    }
}