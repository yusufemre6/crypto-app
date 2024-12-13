using System.Threading.Tasks;
using backend.Services;
using backend.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebSocketController : ControllerBase
    {
        private readonly OKXWebSocketService _webSocketService;
        private readonly IHubContext<MarketHub> _hubContext;

        public WebSocketController(OKXWebSocketService webSocketService,IHubContext<MarketHub> hubContext)
        {
            _webSocketService = webSocketService;
            _hubContext = hubContext;
        }

        [HttpPost("subscribe")]
        public async Task<IActionResult> SubscribeToTicker([FromQuery] string symbol)
        {
            try
            {
                await _webSocketService.ConnectAsync();
                await _webSocketService.SubscribeToTickerAsync(symbol);
                return Ok("Subscription successful.");
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        public async Task<IActionResult> StreamTicker([FromQuery] string symbol)
        {
            try
            {
                await _webSocketService.ConnectAsync();
                await _webSocketService.SubscribeToTickerAsync(symbol);

                await _webSocketService.ReceiveMessagesAsync(async message =>
                {
                    await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
                });

                return Ok("Streaming started.");
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

    }

    
}
