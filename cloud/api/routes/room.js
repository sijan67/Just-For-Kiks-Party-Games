const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Room = require('../models/Room');

const roomCode = "0000";

// GET all rooms
router.get('/', (req, res, next) => {
    Room.find()
        .then(room => {
            res.status(200).json(room);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal server error");
        });
});

// POST a new room
router.post("/:roomCode", async (req, res, next) => {

    const newRoom = new Room({
        code : roomCode,
        ready: 'true'
    });

    await newRoom.save();

    console.log(`A new room has been created with code ${roomCode}.`)
    return res.status(200).json(roomCode)
});

// update a room


// check whether game is ready to start
router.get("/:roomCode", async (req, res) => {
    const { roomCode } = req.params;
    
    try {
        const room = await Room.findOne({ code: roomCode }, "ready");

        if (room) {
            res.status(200).json({ roomCode: roomCode, ready: room.ready });
        } else {
            res.status(404).json({ error: "No rooms found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

