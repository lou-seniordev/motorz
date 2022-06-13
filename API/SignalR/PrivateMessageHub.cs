using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.PrivateMessages;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class PrivateMessageHub : Hub
    {
        private readonly IMediator _mediator;

        private readonly IHubContext<PresenceHub> _presenceHub;

        private readonly PresenceTracker _tracker;

        public PrivateMessageHub(
            IMediator mediator,
            IHubContext<PresenceHub> presenceHub,
            PresenceTracker tracker
        )
        {
            _tracker = tracker;
            _presenceHub = presenceHub;
            _mediator = mediator;
        }

        public async Task SendMessage(Create.Command command)
        {
            string username = GetUsername();

            command.Username = username;

            
            // var otherUser = command.RecipientUsername;

            // var connections = _tracker.GetConnectionsForUser(otherUser);

            // var otherUser = command.RecipientUsername;

            // var connections = await _tracker.GetConnectionsForUser(otherUser);

            // if (connections != null)
            // {
            //     await _presenceHub
            //         .Clients
            //         .Clients(connections)
            //         .SendAsync("NewMessageReceived",
            //         new { username = username });
            // }
            var message = await _mediator.Send(command);

            await Clients
                .Group(command.PrivateMessageThreadId.ToString())
                .SendAsync("ReceiveMessage", message);
        }

        private string GetUsername()
        {
            return Context
                .User?
                .Claims?
                .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?
                .Value;
        }

        public async Task AddToGroup(string messageThreadId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, messageThreadId);

            var username = GetUsername();

            await Clients
                .Group(messageThreadId)
                .SendAsync("SendMessage", $"{username} has joined the group");
        }

        public async Task RemoveFromGroup(string messageThreadId)
        {
            await Groups
                .RemoveFromGroupAsync(Context.ConnectionId, messageThreadId);

            var username = GetUsername();

            await Clients
                .Group(messageThreadId)
                .SendAsync("SendMessage", $"{username} has left the group");
        }
    }
}
