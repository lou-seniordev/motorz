using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PrivateMessages
{
    public class CheckUnread
    {
        public class Query : IRequest<int>
        {
        }

         public class Handler : IRequestHandler<Query, int>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                 _userAccessor = userAccessor;
            }

            public async Task<int> Handle(Query request, CancellationToken cancellationToken)
            {

                // // === Lazy loading ===

                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUsername());

                var queryable =  _context.PrivateMessages.AsQueryable();

                int counter =  queryable
                .Where(x => x.DateRead == null && x.RecipientUsername == user.UserName)
                .Count();

                return counter;
                
            }
        }
    }
}