const express = require("express");
const router = express.Router();
const { getRoomData, createRoom } = require("../models/gameModel");

router.post("/create", (req, res) => {
  const { roomId } = req.body;
  createRoom(roomId);
  res.json({ message: "Room created", roomId });
});

router.get("/:roomId", (req, res) => {
  const roomData = getRoomData(req.params.roomId);
  if (roomData) {
    res.json(roomData);
  } else {
    res.status(404).json({ message: "Room not found" });
  }
});

module.exports = router;
