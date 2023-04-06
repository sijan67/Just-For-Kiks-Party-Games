const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Room = require('../models/Room');


router.get("/", (req, res, next) => {
    Room.find({}, "roomCode").then(room => {
        if (room !== null && room.length > 0) {
            res.write(JSON.stringify(room[0]));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});

router.get("/ready" , (req, res, next) => {