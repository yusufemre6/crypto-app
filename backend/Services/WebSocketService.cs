using System.Net.WebSockets;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace backend.Services
{
    public class WebSocketService
    {
        private const string OKXWebSocketUrl = "wss://ws.okx.com:8443/ws/v5/public";
        private ClientWebSocket _okxSocket;

        public async Task StartAsync(Func<string, Task> sendToFrontend)
        {

            _okxSocket = new ClientWebSocket();
            
            await _okxSocket.ConnectAsync(new Uri(OKXWebSocketUrl), CancellationToken.None);

            var subscribeMessage = new
            {
                op = "subscribe",
                args = new[]
                {
                    new { channel = "tickers", instId = "BTC-USDT" },
                    new { channel = "tickers", instId = "ETH-USDT" },
                    new { channel = "tickers", instId = "XRP-USDT" },
                    new { channel = "tickers", instId = "SOL-USDT" },
                    new { channel = "tickers", instId = "BNB-USDT" }
                }
            };

            var message = JsonConvert.SerializeObject(subscribeMessage);
            await _okxSocket.SendAsync(Encoding.UTF8.GetBytes(message), WebSocketMessageType.Text, true, CancellationToken.None);

            var buffer = new byte[2048];
            while (_okxSocket.State == WebSocketState.Open)
            {
                var result = await _okxSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                var jsonString = Encoding.UTF8.GetString(buffer, 0, result.Count);

                // Veriyi frontend'e gönder
                await sendToFrontend(jsonString);
            }
        }

        public async Task StopAsync()
        {
            if (_okxSocket != null && _okxSocket.State == WebSocketState.Open)
            {
                await _okxSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
            }
        }
    }
}