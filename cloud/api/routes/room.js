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
    const {username} = req.params;

    const newRoom = new Room({
        code : roomCode
    });

    await newRoom.save();

    console.log(`A new room has been created with code ${roomCode}.`)
    return res.status(200).json(roomCode)
});

module.exports = router;