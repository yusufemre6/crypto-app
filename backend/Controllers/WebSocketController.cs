using Microsoft.AspNetCore.Mvc;
using backend.Services;
using System.Text;
using System.Net.WebSockets;


namespace backend.Controllers
{
    [ApiController]
    [Route("/marketHub")]
    public class WebSocketController : ControllerBase
    {
        private readonly WebSocketService _webSocketService;

        public WebSocketController(WebSocketService webSocketService)
        {
            _webSocketService = webSocketService;
        }

        [HttpGet]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                Console.WriteLine("WebSocket bağlantısı kabul edildi.");

                await _webSocketService.StartAsync(async (data) =>
                {
                    var bytes = Encoding.UTF8.GetBytes(data);
                    await socket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);
                });
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }
    }
}