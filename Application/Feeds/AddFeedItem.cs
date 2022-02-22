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

                if (_context.Feeds.Any(x => x.ObjectId == request.ObjectId && x.Notifier.Id == notifier.Id && x.FeedType == request.Info))
                    throw new RestException(HttpStatusCode.Conflict, new { Feed = "Already Exists" });

                var notifees = new List<FeedNotifyee>();
                var feedId = Guid.NewGuid();
                string feedType = request.Info;

                List<string> notifyeeIds;

                if (request.Info.Contains("Added"))
                {

                    #region Added Motocycle Diary
                    if (request.Info == "Added Motocycle Diary")
                    {
                        notifyeeIds = await GetNotifyeeIdsFromFollowers(notifier);

                        var info = " has created a new motorcycle diary on " + DateTime.Now
                            + ". You are welcome to join it.";

                        if (notifyeeIds.Count() > 0)
                        {
                            CreateFeed(request, notifier, notifees, feedId, feedType, notifyeeIds, info);
                        }
                        else
                        {
                            return Unit.Value;
                        }

                    }
                    #endregion
                    #region Added Motofy
                    else if (request.Info == "Added Motofy")
                    {

                        notifyeeIds = await GetNotifyeeIdsFromFollowers(notifier);
                        var info = " has created a new Motofy! on " + DateTime.Now;

                        if (notifyeeIds.Count() > 0)
                        {
                            CreateFeed(request, notifier, notifees, feedId, feedType, notifyeeIds, info);

                            // FillNotifyeeList(notifees, feedId, notifyeeIds);

                        }
                        else
                        {
                            return Unit.Value;
                        }
                    }
                    #endregion
                    #region Added Forumpost

                    else if (request.Info == "Added Forumpost")
                    {

                        notifyeeIds = await GetNotifyeeIdsFromFollowers(notifier);
                        var info = " has added a new forum post on " + DateTime.Now;

                        if (notifyeeIds.Count() > 0)
                        {
                            CreateFeed(request, notifier, notifees, feedId, feedType, notifyeeIds, info);

                        }
                        else
                        {
                            return Unit.Value;
                        }
                    }
                    #endregion
                    #region Added Mechanic

                    else if (request.Info == "Added Mechanic")
                    {

                        notifyeeIds = await GetNotifyeeIdsFromFollowers(notifier);
                        var info = " has added a new mechanic on " + DateTime.Now;

                        if (notifyeeIds.Count() > 0)
                        {
                            CreateFeed(request, notifier, notifees, feedId, feedType, notifyeeIds, info);

                        }
                        else
                        {
                            return Unit.Value;
                        }
                    }
                    #endregion
                    #region Added Product

                    else if (request.Info == "Added Product")
                    {

                        notifyeeIds = await GetNotifyeeIdsFromFollowers(notifier);
                        var info = " has added a new product on " + DateTime.Now;

                        if (notifyeeIds.Count() > 0)
                        {
                            CreateFeed(request, notifier, notifees, feedId, feedType, notifyeeIds, info);

                        }
                        else
                        {
                            return Unit.Value;
                        }
                    }
                    #endregion
                }
                    #region Joined Motocycle Diary
                    if (request.Info == "Joined Motocycle Diary")
                    {
                        // var 
                        notifyeeIds = await _context.UserActivities
                                            .Where(x => x.ActivityId == request.ObjectId && x.AppUserId != notifier.Id)
                                            .Select(x => x.AppUserId)
                                            .ToListAsync();

                        var diary = await _context.Activities
                                            .SingleOrDefaultAsync(x => x.Id == request.ObjectId);//;

                        if (notifyeeIds.Count() > 0)
                        {

                            FillNotifyeeList(notifees, feedId, notifyeeIds);

                            var feed = new Feed//"User " + notifier.DisplayName + 
                            {
                                Id = feedId,
                                Info = " has joined the " + diary.Title + " on " + DateTime.Now
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
                    #region Left Motorcycle Diary
                    else if (request.Info == "Left Motorcycle Diary")
                    {


                        notifyeeIds = await _context.UserActivities
                                        .Where(x => x.IsHost == true)
                                        .Select(x => x.AppUserId)
                                        .ToListAsync();

                        if (notifyeeIds.Count() > 0)
                        {

                            var activity = await _context.Activities
                                                .SingleOrDefaultAsync(x => x.Id == request.ObjectId);

                            FillNotifyeeList(notifees, feedId, notifyeeIds);

                            var feed = new Feed
                            {
                                Id = feedId,
                                Info = " has left the " + activity.Title + ", diary on " + DateTime.Now,
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
                    #region Deactivated Motocycle Diary
                    else if (request.Info == "Deactivated Motocycle Diary")
                    {
                        // var 
                        notifyeeIds = await _context.UserActivities
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
                                Info = " has deactivated the " + diary.Title + " on " + DateTime.Now,
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
                    #region Embraced Motofy
                    else if (request.Info == "Embraced Motofy")
                    {

                        notifyeeIds = await _context.UserMotofies
                                            .Where(x => x.IsOwner == true)
                                            .Select(x => x.AppUserId)
                                            .ToListAsync();

                        if (notifyeeIds.Count() > 0)
                        {
                            var motofy = await _context.Motofies
                                          .SingleOrDefaultAsync(x => x.Id == request.ObjectId);

                            FillNotifyeeList(notifees, feedId, notifyeeIds);

                            var feed = new Feed
                            {
                                Id = feedId,
                                Info = " has embraced the " + motofy.Name + ", Motofy! on " + DateTime.Now,
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
                    #region Deleted Motofy
                    else if (request.Info == "Deleted Motofy")
                    {

                        var embracersIds = await _context.UserMotofies
                                            .Where(x => x.MotofyId == request.ObjectId && x.AppUserId != notifier.Id)
                                            .Select(x => x.AppUserId)
                                            .ToListAsync();

                        notifyeeIds = await GetNotifyeeIdsFromFollowers(notifier);

                        notifyeeIds.AddRange(embracersIds);

                        if (notifyeeIds.Count() > 0)
                        {
                            var motofy = await _context.Motofies
                                          .SingleOrDefaultAsync(x => x.Id == request.ObjectId);

                            FillNotifyeeList(notifees, feedId, notifyeeIds);

                            var feed = new Feed//"User " + notifier.DisplayName + 
                            {
                                Id = feedId,
                                Info = " has deleted the " + motofy.Name + ", Motofy! on " + DateTime.Now,
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

            private void CreateFeed(Command request, AppUser notifier, List<FeedNotifyee> notifees, Guid feedId, string feedType, List<string> notifyeeIds, string info)
            {
                FillNotifyeeList(notifees, feedId, notifyeeIds);

                var feed = new Feed
                {
                    Id = feedId,
                    Info = info,
                    Notifier = notifier,
                    ObjectId = request.ObjectId,
                    DateTriggered = DateTime.Now,
                    FeedType = feedType,
                    Notifyees = notifees
                };

                _context.Feeds.Add(feed);
            }

            private async Task<List<string>> GetNotifyeeIdsFromFollowers(AppUser notifier)
            {
                return await _context.Followings
                                    .Where(x => x.TargetId == notifier.Id)
                                    .Select(x => x.ObserverId)
                                    .ToListAsync();
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