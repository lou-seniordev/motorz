using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListMotofies
    {
        public class Query : IRequest<List<UserMotofyDto>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserMotofyDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserMotofyDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                var queryable = _context.UserMotofies
                    .OrderBy(a => a.Motofy.DatePublished)
                    .AsQueryable();
               

                switch (request.Predicate)
                {
                    case "iPublished":
                        queryable = queryable.Where(a => a.AppUser.UserName == user.UserName && a.IsOwner);
                        break;
                    case "iEmbraced":
                        queryable = queryable.Where(a => a.AppUser.UserName == user.UserName && !a.IsOwner);  
                        break;
                    case "iRated":
                        queryable = queryable.Where(u => u.Motofy.MotofyScores.Any(s => s.User.Id == user.Id));
                        break;
                    default:
                        break;
                }

                var motofies = queryable.ToList();
                var motofiesToReturn = new List<UserMotofyDto>();

                foreach (var motofy in motofies)
                {
                    var userMotofy = new UserMotofyDto
                    {
                        Id = motofy.Motofy.Id,
                        Name = motofy.Motofy.Name,
                        YearOfProduction = motofy.Motofy.YearOfProduction,
                        DatePublished = motofy.Motofy.DatePublished,
                        PhotoUrl = motofy.Motofy.PhotoUrl
                    };

                    motofiesToReturn.Add(userMotofy);
                }

                return motofiesToReturn;

            }
        }
    }
}