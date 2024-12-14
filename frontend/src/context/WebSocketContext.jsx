import React, { createContext, useEffect, useState } from "react";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5242/marketHub"); // Backend WebSocket endpoint
    console.log("WebSocket bağlantısı kuruluyor...");

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData((prevData) => [...prevData, parsedData]); // Gelen veriyi state'e ekle
      } catch (error) {
        console.error("Gelen veri çözülemedi:", error);
      }
    };

    socket.onclose = () => console.log("WebSocket bağlantısı kapatıldı.");
    socket.onerror = (error) => console.error("WebSocket hatası:", error);

    return () => socket.close(); // Bileşen unmount edilirse bağlantıyı kapat
  }, []);

  return (
    <WebSocketContext.Provider value={data}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Default export olarak WebSocketProvider ve WebSocketContext'i ekliyoruz
export default WebSocketProvider;
export { WebSocketContext };