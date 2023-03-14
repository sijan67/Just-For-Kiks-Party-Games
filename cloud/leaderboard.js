const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Leaderboard = require('../models/Leaderboard');

router.get("/", (req, res, next) => {
    Leaderboard.find({}, "teamname teamscore").then(team => {
        if (team !== null && team.length > 0) {
            res.write(JSON.stringify(team));
        } else {
            res.write("No teams found");
        }
        res.end();
    })
});

module.exports = router;