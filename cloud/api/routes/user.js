const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require('../models/User');
const Team = require('../models/Team');

/* GET Operations */

// GET all users
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

// GET a user from username
router.get('/:username/', (req, res) => {
    const { username } = req.params;
    User.find({ username }, "username teamID roomCode").then(user => {
        if (user !== null && user.length > 0) {
            res.write(JSON.stringify(user[0]));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});

// GET a user's team from username
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

// GET a user's room from username
router.get('/:username/roomCode', (req, res) => {
    const { username } = req.params;
    User.find({ username }, "roomCode").then(user => {
        if (user !== null && user.length > 0) {
            res.write(JSON.stringify(user[0]));
        } else {
            res.write("No users found");
        }
        res.end();
    });
});

// GET a user's team name from username
router.get("/:username/teamName", (req, res, next) => {
    const { username } = req.params;
    User.find({ username }, "teamID").then(teamID => {
        if (teamID !== null) {
            Team.find({ teamID }, "teamName").then(teamName => {
                if (teamName !== null && teamName.length > 0) {
                    res.write(JSON.stringify(teamName));
                } else {
                    res.write("No team found");
                }
                res.end();
            });
        }
    })
});

/* POST Operations */

// POST a new user
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

/* DELETE Operations */

// DELETE one user
router.delete('/:username', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.username);
        if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE all users
router.delete('/', async (req, res, next) => {
    try {
      await User.deleteMany();
      res.status(200).json({ message: 'All teams have been deleted.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// DELETE all users
module.exports = router;