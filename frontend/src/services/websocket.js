import { io } from "socket.io-client";

const socket = io("http://localhost:5242"); // Backend URL'si

export default socket;