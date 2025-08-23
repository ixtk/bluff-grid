import { io } from "socket.io-client"

// Create a socket instance
export const socket = io("http://localhost:3000", {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket', 'polling']
});

// Add socket middleware or event listeners
socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
});

socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
    if (reason === "io server disconnect") {
        // Server initiated disconnect, try to reconnect
        socket.connect();
    }
});