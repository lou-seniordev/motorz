using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using System.Linq;
using Application.Interfaces;

namespace Application.Profiles
{
    public class ListPeople
    {
        public class PeopleEnvelope
        {
            public List<Profile> People { get; set; }
            public int PeopleCount { get; set; }
        }
        public class Query : IRequest<PeopleEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }

        }

        public class Handler : IRequestHandler<Query, PeopleEnvelope>
        {
            private readonly DataContext _context;
            private readonly IProfileReader _profileReader;

            public Handler(DataContext context, IProfileReader profileReader)
            {
                _profileReader = profileReader;
                _context = context;
            }

            public async Task<PeopleEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {

                var queryable = _context.Users.AsQueryable();

                var people = new List<AppUser>();

                people = await queryable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3)
                .ToListAsync();

                var profiles = new List<Profile>();

                foreach(var person in people)
                {
                    profiles.Add(await _profileReader
                        .ReadProfile(person.UserName));
                }
               
                return new PeopleEnvelope
                {
                    People = profiles,
                    PeopleCount = queryable.Count()
                };
            }
        }
    }
}