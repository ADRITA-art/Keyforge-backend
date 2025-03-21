const rooms = {};

const generateParagraph = () => {
  const paragraphs = [
    "The quick brown fox jumps over the lazy dog. This sentence is often used to test fonts, keyboard layouts, and other text-related functionality. It contains every letter in the English alphabet, making it a useful tool for demonstrating typography and testing how text appears in a given style.",
    
    "WebSockets enable real-time communication between clients and servers, allowing for the efficient exchange of data without the need for constant polling. This technology is widely used in chat applications, online gaming, live data feeds, and collaborative tools, making it an essential part of modern web development. WebSockets offer low-latency, bi-directional communication, which is key for providing smooth user experiences in real-time applications.",
    
    "JavaScript is a powerful and versatile programming language that plays a central role in web development. It enables developers to build dynamic and interactive websites by manipulating the Document Object Model (DOM), handling user input, and performing asynchronous operations like fetching data from APIs. In addition to client-side functionality, JavaScript has evolved to support server-side development through technologies like Node.js, making it a full-stack language capable of handling both front-end and back-end tasks."
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
