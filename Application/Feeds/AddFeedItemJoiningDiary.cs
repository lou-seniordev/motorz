using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using System.Linq;
using System.Collections.Generic;

namespace Application.Feeds
{
    public class AddFeedItemJoiningDiary
    {
        public class Command : IRequest
        {
            public Guid DiaryId { get; set; }
           
            // public string Info { get; set; }
          
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DiaryId).NotEmpty();
                
                // RuleFor(x => x.Info).NotEmpty();

            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var notifier = await _context.Users.SingleOrDefaultAsync(
                     x => x.UserName == _userAccessor.GetCurrentUsername());

                var notifyeeIds = await _context.UserActivities
                                    // .AsQueryable()
                                    .Where(x => x.ActivityId == request.DiaryId && x.AppUserId != notifier.Id)
                                    .Select(x => x.AppUserId)
                                    .ToListAsync();

                var notifees = new List<FeedNotifyee>();
                var feedId = Guid.NewGuid();
                string feedType = "Joined Activity";


                foreach (var id in notifyeeIds)
                {
                    var notifee = new FeedNotifyee
                    {
                        Id = Guid.NewGuid(),
                        AppUserId = id,
                        FeedId = feedId

                    };
                    notifees.Add(notifee);

                }
                var feed = new Feed
                {
                    Id = feedId,
                    Notifier = notifier,
                    ObjectId = request.DiaryId,
                    DateTriggered = DateTime.Now,
                    FeedType = feedType,
                    Notifyees = notifees
                };

                _context.Feeds.Add(feed);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }
        }
    }
}