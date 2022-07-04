using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;


namespace Application.PrivateMessages
{
    public class CheckUnread
    {
        public class Query : IRequest<List<string>>
        {
        }

         public class Handler : IRequestHandler<Query, List<string>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                 _userAccessor = userAccessor;
            }

            public async Task<List<string>> Handle(Query request, CancellationToken cancellationToken)
            {

                // // === Lazy loading ===

                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable =  _context.PrivateMessages.AsQueryable();

                var usernames = new List<string>();

                usernames =  queryable
                .Where(x => x.DateRead == null && x.RecipientUsername == user.UserName)
                .Select(x => x.SenderUsername)
                .Distinct()
                .ToList();

                return usernames;
                
            }
        }
    }
}