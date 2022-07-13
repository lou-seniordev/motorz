using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Feeds.FeedHub
{
    //224
    public class FeedPresenceTracker
    {
        private static readonly Dictionary<string, List<string>> ListOfOnlineUsers
            = new Dictionary<string, List<string>>();

        public Task UserConnected(string username, string connectionId)
        {
            lock (ListOfOnlineUsers)
            {
                if (ListOfOnlineUsers.ContainsKey(username))
                {
                    ListOfOnlineUsers[username].Add(connectionId);
                }
                else
                {
                    ListOfOnlineUsers.Add(username, new List<string> { connectionId });
                }
            }
            return Task.CompletedTask;
        }

        public Task UserDisconnected(string username, string connectionId)
        {
            lock (ListOfOnlineUsers)
            {
                if (!ListOfOnlineUsers.ContainsKey(username)) return Task.CompletedTask;

                ListOfOnlineUsers[username].Remove(connectionId);
                if (ListOfOnlineUsers[username].Count == 0)
                {
                    ListOfOnlineUsers.Remove(username);
                }
            }
            return Task.CompletedTask;
        }

        public Task<string[]> GetOnlineUsers() 
        {
            string[] onlineUsers;
            lock(ListOfOnlineUsers)
            {
                onlineUsers = ListOfOnlineUsers.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
            }

            return Task.FromResult(onlineUsers);
        }

        public Task<List<string>> GetConnectionsForUser(string username)
        {
            List<string> connectionIds;
            lock(ListOfOnlineUsers)
            {
                connectionIds = ListOfOnlineUsers.GetValueOrDefault(username);
            }

            return Task.FromResult(connectionIds);
        }
    }
}