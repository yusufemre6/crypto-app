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
                // WebSocket bağlantısını yalnızca bir kez başlatıyoruz
                if (_webSocketService.IsConnected() == false)
                {
                    await _webSocketService.ConnectAsync();
                }

                await _webSocketService.SubscribeToTickerAsync(symbol);
                return Ok("Subscription successful.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        [HttpPost("stream")]
        public async Task<IActionResult> StreamTicker([FromQuery] string symbol)
        {
            try
            {
                // Tekrar bağlantıyı başlatmadan önce kontrol et
                if (_webSocketService.IsConnected() == false)
                {
                    await _webSocketService.ConnectAsync();
                }

                // Abonelik işlemi
                await _webSocketService.SubscribeToTickerAsync(symbol);

                // Mesajları sürekli al ve SignalR ile yayınla
                await _webSocketService.ReceiveMessagesAsync(async message =>
                {
                    Console.WriteLine($"SignalR'e gönderilecek mesaj: {message}");
                    await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
                });

                return Ok("Streaming started.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
