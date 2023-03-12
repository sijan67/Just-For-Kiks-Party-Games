const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Math = require('./api/models/Math');

router.get("/math/:teamname/score", (req, res, next) => {
    const teamname = req.params.teamname;
    Math.findOne({ teamname }, "teamscore").then(team => {
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