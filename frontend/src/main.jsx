import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WebSocketProvider } from "./context/WebSocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </React.StrictMode>
);