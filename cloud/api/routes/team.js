const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Team = require('../models/Team');
const User = require('../models/User');

function getNextId() {
    return Team.find().sort({ teamID: -1 }).limit(1).then(result => {
        if (result.length === 0) {
        return 1; // No resources in the collection, start at 1
        }
        return result[0].teamID + 1; // Add one to the highest ID found
    });
}

router.get('/', (req, res, next) => {
    Team.find()
        .then(team => {
            res.status(200).json(team);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal server error");
        });
});

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

router.post("/", async (req, res, next) => {
    const { teamname } = req.body;

    getNextId().then(id => {
        const newTeam = new Team({
            teamname: teamname,
            teamScore: 0,
            teamID : id
        });
        newTeam.save().then(result => {
            res.status(201).json(result);
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal server error");
        });
        }).catch(err => {
        console.error(err);
        res.status(500).send("Internal server error");
        });
});

module.exports = router;