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

/* GET Operations */

// GET all teams
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

// GET team by ID
router.get("/:teamID/", (req, res, next) => {
    const { teamID } = req.params;
    Team.find({ teamID }, "teamName teamScore teamSize").then(team => {
        if (team !== null && team.length > 0) {
            res.write(JSON.stringify(team[0]));
        } else {
            res.write("No team found");
        }
        res.end();
    })  
});

/* POST Operations */

// POST a new team
router.post("/", async (req, res, next) => {
    const { teamName } = req.body;

    getNextId().then(id => {
        const newTeam = new Team({
            teamName: teamName,
            teamScore: 0,
            teamID : id,
            teamSize: 1
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

/* DELETE Operations */

// DELETE one team
router.delete('/:teamID', async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.teamID);
        if (!deletedTeam) {
        return res.status(404).json({ message: 'Team not found.' });
        }
        res.status(200).json({ message: 'Team deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE all teams
router.delete('/', async (req, res, next) => {
    try {
      await Team.deleteMany();
      res.status(200).json({ message: 'All teams have been deleted.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;