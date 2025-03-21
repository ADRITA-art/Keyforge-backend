const { joinRoom, updateProgress, getRoomData, createRoom } = require("../models/gameModel");

const handleSocketConnection = (socket, io) => {
  console.log(` New client connected: ${socket.id}`);

  socket.on("createRoom", ({ roomId }) => {
    createRoom(roomId);
    console.log(` Room ${roomId} created`);
  });

  socket.on("joinRoom", ({ roomId, playerId }) => {
    joinRoom(roomId, playerId);
    const roomData = getRoomData(roomId);

    if (!roomData) {
      socket.emit("error", { message: "Room does not exist" });
      return;
    }

    socket.join(roomId);
    socket.emit("paragraph", roomData.paragraph);
    io.to(roomId).emit("playerJoined", { playerId, players: roomData.players });
  });

  socket.on("updateProgress", ({ roomId, playerId, progress }) => {
    const isCompleted = updateProgress(roomId, playerId, progress);
    io.to(roomId).emit("progressUpdate", getRoomData(roomId));

    if (isCompleted) {
      io.to(roomId).emit("winner", { playerId });
      console.log(` Player ${playerId} won the game in Room ${roomId}`);
    }
  });

  socket.on("disconnect", () => {
    console.log(` Player ${socket.id} disconnected.`);
  });
};

module.exports = { handleSocketConnection };
