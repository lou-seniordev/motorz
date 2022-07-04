using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.PrivateMessages;
using Domain;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Persistence;

namespace API.SignalR
{
    public class PrivateMessageHub : Hub
    {
        private readonly IMediator _mediator;

        private readonly IHubContext<PresenceHub> _presenceHub;

        private readonly PresenceTracker _tracker;
        private readonly DataContext _context;

        public PrivateMessageHub(
            IMediator mediator,
            IHubContext<PresenceHub> presenceHub,
            PresenceTracker tracker,
            DataContext context
        )
        {
            _tracker = tracker;
            _presenceHub = presenceHub;
            _mediator = mediator;
            _context = context;
        }

        public override async Task OnConnectedAsync()
        {
            var username = GetUsername();

            var httpContext = Context.GetHttpContext();
            var otherUser = httpContext.Request.Query["user"].ToString();
            var groupName = GetGroupName(username, otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await AddToGroup(Context, groupName);

        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await RemoveFromGroup(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(Create.Command command)
        {
            string username = GetUsername();

            command.Username = username;

            var message = await _mediator.Send(command);

            var groupName = GetGroupName(username, command.RecipientUsername);

            var group = await _mediator.Send(new GetMessageGroup.Query { GroupName = groupName });

            if (group.Connections.Any(x => x.Username == command.RecipientUsername))
            {
                message.DateRead = DateTime.UtcNow;
            }
            else
            {
                var connections = await _tracker.GetConnectionsForUser(command.RecipientUsername);
                if (connections != null)
                {
                    await _presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived",
                        message);
                }
            }


            await Clients
                .Group(groupName)
                .SendAsync("ReceiveMessage", message);
        }
        public async Task DeleteMessage(Delete.Command command)
        {
            var message = await _mediator.Send(command);
            string username = GetUsername();
            var group = GetGroupName(username, command.RecipientUsername);

            await Clients
                .Group(group)
                .SendAsync("MessageDeleted", message);
        }

        public async Task EditMessage(Edit.Command command)
        {
            string username = GetUsername();

            command.Username = username;

            var message = await _mediator.Send(command);
            var group = GetGroupName(username, command.RecipientUsername);

            await Clients
                .Group(group)
                .SendAsync("MessageEdited", message);
        }



        public async Task<bool> AddToGroup(HubCallerContext context, string groupName)
        {

            string username = GetUsername();

            var group = await _mediator.Send(new GetMessageGroup.Query { GroupName = groupName });
            var connection = new Connection(Context.ConnectionId, username);

            if (group == null)
            {
                group = new Group(groupName);
                await _mediator.Send(new AddGroup.Command { Group = group });

            }

            group.Connections.Add(connection);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return true;

            throw new HubException("Operation -adding to group- failed");


        }

        public async Task RemoveFromGroup(string connectionId)
        {
            var connection = await _mediator.Send(new GetConnection.Query { ConnectionId = connectionId });
            await _mediator.Send(new RemoveConnection.Command { Connection = connection });

            var success = await _context.SaveChangesAsync() > 0;
        }

        private string GetUsername()
        {
            return Context
                .User?
                .Claims?
                .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?
                .Value;
        }

        private string GetGroupName(string caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller, other) < 0;
            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}
