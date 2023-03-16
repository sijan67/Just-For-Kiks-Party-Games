const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Trivia = require('../models/Trivia');
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

// GET all teams
router.get('/', async (req, res, next) => {
    try {
      const teams = await Trivia.find();
      res.json(teams);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while retrieving the teams' });
    }
  });  

module.exports = router;