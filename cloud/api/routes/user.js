const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require('../models/User');

router.get("/", (req, res, next) => {
    User.find({}, "username teamname teamscore roomcode").then(users => {
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
      teamname: req.body.teamname,
      roomcode: req.body.roomcode
    });
    newUser
      .save()
      .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
});

router.get("/:username", (req, res, next) => {
    const {username} = req.params;
    User.find({ username }, "username teamname teamscore roomcode").then(user => {
        if (user !== null && user.length > 0) {
            res.write(JSON.stringify(user[0]));
        } else {
            res.write("No users found");
        }
        res.end();
    })
});


router.get('/:username/roomcode', (req, res) => {
    const {username} = req.params;
    User.find({ username }, "roomcode").then(user => {
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