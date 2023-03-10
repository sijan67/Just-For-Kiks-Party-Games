const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require('./api/models/User');

router.get("/", (req, res, next) => {
    User.find()
      .exec()
      .then(docs => {
        res.status(200).json(JSON.stringify(docs[0]));
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
});

router.post("/", (req, res, next) => {
    const User = new User({
      username: req.body.username,
      teamname: req.body.teamname,
      roomcode: req.body.roomcode
    });
    User
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
    const username = req.params.username;
    User.findOne({ username }, "username roomcode teamname").then(user => {
        if (user !== null) {
            res.write(JSON.stringify(user[0]));
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }).catch(error => {
        res.status(500).json({ error: "Server error" });
    });
});


router.get('/:username/roomcode', (req, res) => {
    const username = req.params.username;
    User.find({}, "roomcode").then(user => {
        if (user !== null && user.length > 0) {
            res.write(JSON.stringify(user[0]));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});

router.get('/:username/teamname', (req, res) => {
    const username = req.params.username;
    User.find({}, "teamname").then(user => {
        if (user !== null && user.length > 0) {
            res.write(JSON.stringify(user[0]));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});