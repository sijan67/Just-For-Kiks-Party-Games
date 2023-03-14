const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require('../models/User');

router.get("/:teamname/score", (req, res, next) => {
    const {teamname} = req.params;
    User.find({ teamname }, "teamscore").then(team => {
        if (team !== null) {
            res.write(JSON.stringify(team[0]));
        } else {
            res.write("No team found");
        }
        res.end();
    });
});


module.exports = router;