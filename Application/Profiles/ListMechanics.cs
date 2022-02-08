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
    public class ListMechanics
    {
         public class Query : IRequest<List<UserMechanicDto>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserMechanicDto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserMechanicDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                var queryable = _context.Mechanics
                   
                    .OrderBy(a => a.DatePublished)
                    .AsQueryable();

                switch (request.Predicate)
                {
                    case "iRated":
                        queryable = queryable
                        .Where(x => x.Ratings
                        .Any(a => a.User.Id == user.Id));
                        
                        break;
                    case "iRecommend":
                         queryable = queryable
                         .Where(x => x.Customers
                         .Any(r => r.CustomerRecommended == true && r.AppUserId == user.Id));
                       
                        break;
                    default://iPublished
                        queryable = queryable
                        .Where(x => x.Publisher.Id == user.Id);
                        break;
                }

                var mechanics = queryable.ToList();
                var mechanicsToReturn = new List<UserMechanicDto>();

                foreach (var mechanic in mechanics)
                {
                    var userMechanic = new UserMechanicDto
                    {
                        Id = mechanic.Id,
                        Name = mechanic.Name,
                        PhotoUrl = mechanic.MechanicPhoto.Url,
                        DatePublished = mechanic.DatePublished
                    };

                    mechanicsToReturn.Add(userMechanic);
                }

                return mechanicsToReturn;

            }
        }
    }
}