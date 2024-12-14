// src/services/websocket.js
const WebSocketService = () => {
    let socket = null;
  
    const connect = (url, onMessage) => {
      socket = new WebSocket(url);
  
      socket.onopen = () => {
        console.log('WebSocket connected');
      };
  
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
      };
  
      socket.onerror = (error) => {
        console.log('WebSocket error:', error);
      };
  
      socket.onclose = () => {
        console.log('WebSocket closed');
      };
    };
  
    const disconnect = () => {
      if (socket) {
        socket.close();
      }
    };
  
    return {
      connect,
      disconnect,
    };
  };
  
  export default WebSocketService();  