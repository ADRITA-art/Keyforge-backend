require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const gameRoutes = require("./routes/gameRoute");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use("/api/game", gameRoutes);
app.get("/", (req, res) => {
  res.send("Server is up and running");
  console.log("OK👍")
});


const { handleSocketConnection } = require("./controllers/gameController");
io.on("connection", (socket) => handleSocketConnection(socket, io));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
