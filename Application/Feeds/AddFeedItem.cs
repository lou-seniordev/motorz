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
using Application.Errors;
using System.Net;

namespace Application.Feeds
{
    public class AddFeedItem
    {
        public class Command : IRequest
        {
            public Guid ObjectId { get; set; }

            public string Info { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ObjectId).NotEmpty();

                RuleFor(x => x.Info).NotEmpty();

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

                if (_context.Feeds.Any(x => x.ObjectId == request.ObjectId && x.Notifier.Id == notifier.Id))
                    throw new RestException(HttpStatusCode.Conflict, new { Feed = "Already Exista" });

                var notifees = new List<FeedNotifyee>();
                var feedId = Guid.NewGuid();
                string feedType = request.Info;

                if (request.Info == "Added Motocycle Diary")
                {
                    var notifyeeIds = await _context.Followings
                                        .Where(x => x.TargetId == notifier.Id)
                                        .Select(x => x.ObserverId)
                                        .ToListAsync();

                    if (notifyeeIds.Count() > 0)
                    {

                        FillNotifyeeList(notifees, feedId, notifyeeIds);

                        // var diary = await _context.Activities
                        //                     .SingleOrDefaultAsync(x => x.Id == request.ObjectId);

                        var feed = new Feed
                        {
                            Id = feedId,
                            Info = "User " + notifier.DisplayName + " has created a new motorcycle diary on " + DateTime.Now
                           + ". You are welcome to join it.",
                            Notifier = notifier,
                            ObjectId = request.ObjectId,
                            DateTriggered = DateTime.Now,
                            FeedType = feedType,
                            Notifyees = notifees
                        };

                        _context.Feeds.Add(feed);
                    }
                    else
                    {
                        return Unit.Value;
                    }

                }
                else if (request.Info == "Joined Motocycle Diary")
                #region Joined Motocycle Diary
                {
                    var notifyeeIds = await _context.UserActivities
                                        .Where(x => x.ActivityId == request.ObjectId && x.AppUserId != notifier.Id)
                                        .Select(x => x.AppUserId)
                                        .ToListAsync();

                    var diary = await _context.Activities
                                        .SingleOrDefaultAsync(x => x.Id == request.ObjectId);//;

                    if (notifyeeIds.Count() > 0)
                    {

                        FillNotifyeeList(notifees, feedId, notifyeeIds);

                        var feed = new Feed
                        {
                            Id = feedId,
                            Info = "User " + notifier.DisplayName + " has joined the " + diary.Title + " on " + DateTime.Now
                            + " alongside with " + notifyeeIds.Count() + " people ",
                            Notifier = notifier,
                            ObjectId = request.ObjectId,
                            DateTriggered = DateTime.Now,
                            FeedType = feedType,
                            Notifyees = notifees
                        };

                        _context.Feeds.Add(feed);
                    }
                    else
                    {
                        return Unit.Value;
                    }
                }
                #endregion

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem Saving Changes");
            }

            private static void FillNotifyeeList(List<FeedNotifyee> notifees, Guid feedId, List<string> notifyeeIds)
            {
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
            }
        }
    }
}