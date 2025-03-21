const { io } = require("socket.io-client");

const socket = io("ws://localhost:5000");


socket.on("connect", () => {
  console.log(" Connected to WebSocket server!");
  
  socket.emit("joinGame", "Player1");

  socket.emit("message", "Hello from client!");
});

socket.on("message", (msg) => {
  console.log(" Server says:", msg);
});

socket.on("playerJoined", (data) => {
  console.log(`🎮 ${data.playerName} has joined the game!`);
});

socket.on("updateProgress", (data) => {
  console.log(" Typing progress update:", data);
});

socket.on("disconnect", () => {
  console.log(" Disconnected from WebSocket server");
});
