const rooms = {};

const generateParagraph = () => {
  const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "WebSockets enable real-time communication between clients and servers.",
    "JavaScript is a powerful language for web development.",
  ];
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
};

const createRoom = (roomId) => {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      paragraph: generateParagraph(),
      players: {}, 
    };
  }
};

const joinRoom = (roomId, playerId) => {
  createRoom(roomId); 
  if (!rooms[roomId].players[playerId]) {
    rooms[roomId].players[playerId] = { progress: 0 };
  }
};

const updateProgress = (roomId, playerId, progress) => {
  if (!rooms[roomId] || !rooms[roomId].players[playerId]) return false;

  rooms[roomId].players[playerId].progress = Math.min(progress, 100);

  return progress >= 100;
};

const getRoomData = (roomId) => rooms[roomId] || null;

module.exports = { joinRoom, updateProgress, getRoomData, createRoom };
