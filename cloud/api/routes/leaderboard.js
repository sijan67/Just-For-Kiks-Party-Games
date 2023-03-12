const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Leaderboard = require('./api/models/Leaderboard');

router.get("/:teamname/score", (req, res, next) => {
    const teamname = req.params.teamname;
    Leaderboard.findOne({ teamname }, "teamscore").then(team => {
        if (team !== null) {
            res.write(JSON.stringify(team[0]));
        } else {
            res.status(404).json({ error: "Team not found" });
        }
    }).catch(error => {
        res.status(500).json({ error: "Server error" });
    });
});

module.exports = router;