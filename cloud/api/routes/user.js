const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require('../models/User');
const Team = require('../models/Team');

router.get("/", (req, res, next) => {
    User.find({}, "username teamID roomCode").then(users => {
        if (users !== null && users.length > 0) {
            res.write(JSON.stringify(users));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});

router.post("/", (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        teamID: req.body.teamID,
        roomCode: req.body.roomCode
    });
    newUser
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /users",
        createdUser: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:username/team", (req, res, next) => {
    const { username } = req.params;
    User.find({ username }, "teamID").then(teamID => {
        if (teamID !== null) {
            Team.find({ teamID }, "teamID teamName teamScore teamSize").then(team => {
                if (team !== null && team.length > 0) {
                    res.write(JSON.stringify(team[0]));
                } else {
                    res.write("No team found");
                }
                res.end();
            });
        }
    })
});

router.get('/:username/roomcode', (req, res) => {
    const {username} = req.params;
    User.find({ username }, "roomCode").then(user => {
        if (user !== null && user.length > 0) {
            res.write(JSON.stringify(user[0]));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});

router.get('/:username/teamname', (req, res) => {
    const {username} = req.params;
    User.find({username}, "teamname").then(user => {
        if (user !== null && user.length > 0) {
            res.write(JSON.stringify(user[0]));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});

module.exports = router;