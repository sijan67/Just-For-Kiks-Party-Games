const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require('../models/User');

router.get("/:username/score", (req, res, next) => {
    const {username} = req.params;
    User.find({ username }, "teamscore").then(team => {
        if (team !== null && team.length > 0) {
            res.write(JSON.stringify(team[0]));
        } else {
            res.write("No team found");
        }
        res.end();
    })  
});

module.exports = router;