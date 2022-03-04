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

namespace Application.DiaryEntries
{
    public class Details
    {
        public class Query : IRequest<DiaryEntryDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, DiaryEntryDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<DiaryEntryDto> Handle(Query request, CancellationToken cancellationToken)
            {
               
                var diary = await _context.DiaryEntries.FindAsync(request.Id);

                if (diary == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { diary = "NotFound" });

                var diaryToReturn = _mapper.Map<DiaryEntry, DiaryEntryDto>(diary);

                return diaryToReturn;
            }
        }
    }
}