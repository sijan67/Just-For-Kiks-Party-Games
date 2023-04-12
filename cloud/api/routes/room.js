const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Room = require('../models/Room');
const Team = require('../models/Team');
const User = require('../models/User');
const Game = require('../models/Game');
const Buzzer = require('../models/Buzzer');

let R = "";

// GET the roomCode
router.get('/', async (req, res, next) => {
    
    await User.deleteMany({});
    await Team.deleteMany({});
    await Game.deleteMany({});

    const roomCode = Math.floor(1000 + Math.random() * 9000).toString();
    R = roomCode;
    res.status(200).json(roomCode);
});

// get the roomCode for frontend
router.get('/roomCode', (req, res, next) => {
    Room.find({}, 'code').then(room => {
        if (room !== null && room.length > 0) {
            res.status(200).json(room)
        } else {
            res.write("No room found");
        }
        res.end();
    });
})

// POST a new room
router.post("/:roomCode", async (req, res, next) => {
    const {roomCode} = req.params;
    if (roomCode !== R){
        res.status(200).json("Room code is wrong");
    } 
    else{
        try{
            const newRoom = new Room({
                code : roomCode,
                ready: 'false'
            });
        
            await newRoom.save();
        
            console.log(`A new room has been created with code ${roomCode}.`)
            return res.status(200).json(roomCode)
        } catch (err) {
            console.log("Room already exists");
            res.status(200).json("Room code exists");
        }
    } 
});

// update a room
router.put("/:roomCode", async (req, res, next) => {
    const { roomCode } = req.params;
    const { ready } = req.body;
  
    try {
      const updatedRoom = await Room.findOneAndUpdate(
        { code: roomCode },
        { ready: ready },
      );
  
      if (!updatedRoom) {
        return res.status(404).json({ error: "Room not found" });
      }
  
      console.log(`Room with code ${roomCode} has been updated.`);
      return res.status(200).json(updatedRoom);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  

// check whether game is ready to start
router.get("/:roomCode", async (req, res) => {
    const { roomCode } = req.params;
    
    try {
        const room = await Room.findOne({ code: roomCode }, "ready");

        if (room) {
            res.status(200).json({ roomCode: roomCode, ready: room.ready });
        } else {
            res.status(200).json({ error: "No rooms found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

