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
        public PrivateMessageHub(IMediator mediator)
        {
            _mediator = mediator;
        }
        // public async Task SendMessage(Create.Command command)
        public async Task SendMessage(Create.Command command)
        {
            string username = GetUsername();

            command.Username = username;

            var message = await _mediator.Send(command);

            await Clients.Group(command.PrivateMessageThreadId.ToString()).SendAsync("ReceiveMessage", message);
        }

        private string GetUsername()
        {
            return Context.User?.Claims?
            .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
        }

        public async Task AddToGroup (string messageThreadId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, messageThreadId);

            var username = GetUsername();

            await Clients.Group(messageThreadId).SendAsync("SendMessage", $"{username} has joined the group");
        }
        public async Task RemoveFromGroup (string messageThreadId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, messageThreadId);

            var username = GetUsername();

            await Clients.Group(messageThreadId).SendAsync("SendMessage", $"{username} has left the group");
        }
    }
}