using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class MarketHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}