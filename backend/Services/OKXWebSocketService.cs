using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace backend.Services
{
    public class OKXWebSocketService
    {
        private readonly ClientWebSocket _webSocket;
        private const string OKXWebSocketUrl = "wss://ws.okx.com:8443/ws/v5/public";

        public OKXWebSocketService()
        {
            _webSocket = new ClientWebSocket();
        }

        public async Task ConnectAsync()
        {
            await _webSocket.ConnectAsync(new Uri(OKXWebSocketUrl), CancellationToken.None);
            Console.WriteLine("WebSocket bağlantısı kuruldu.");
        }

        public async Task SubscribeToTickerAsync(string symbol)
        {
            if (_webSocket.State != WebSocketState.Open)
                throw new InvalidOperationException("WebSocket bağlantısı açık değil.");

            var subscribeMessage = $@"{{
                ""op"": ""subscribe"",
                ""args"": [{{""channel"": ""tickers"", ""instId"": ""{symbol}""}}]
            }}";

            var messageBuffer = Encoding.UTF8.GetBytes(subscribeMessage);
            await _webSocket.SendAsync(messageBuffer, WebSocketMessageType.Text, true, CancellationToken.None);
        }

        public async Task ReceiveMessagesAsync(Action<string> handleMessage)
        {
            var buffer = new byte[1024 * 4];

            while (_webSocket.State == WebSocketState.Open)
            {
                var result = await _webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await _webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Connection closed", CancellationToken.None);
                }
                else
                {
                    var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    handleMessage(message);
                }
            }
        }
    }
}
