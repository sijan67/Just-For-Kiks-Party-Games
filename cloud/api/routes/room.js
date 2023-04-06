const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Room = require('../models/Question');

const roomCode = "0000";

// GET all rooms
router.get("/", (req, res, next) => {
    Room.find({}, "code").then(roomCode => {
        if (roomCode !== null && questions.length > 0) {
            res.send(roomCode);
        } else {
            res.send("No rooms found");
        }
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