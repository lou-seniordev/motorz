using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Application.Feeds.FeedHub
{
    public class FeedHub : Hub
    {

        private readonly FeedPresenceTracker _tracker;

        public FeedHub(
            FeedPresenceTracker tracker
        )
        {
            _tracker = tracker;
        }

        public override async Task OnConnectedAsync()
        {
            await _tracker.UserConnected(GetUsername(), Context.ConnectionId);
            await Groups.AddToGroupAsync(Context.ConnectionId, GetUsername());

        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await _tracker.UserDisconnected(GetUsername(), Context.ConnectionId);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, GetUsername());

            await base.OnDisconnectedAsync(exception);
        }

        private string GetUsername()
        {
            return Context
                .User?
                .Claims?
                .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?
                .Value;
        }

    }
}