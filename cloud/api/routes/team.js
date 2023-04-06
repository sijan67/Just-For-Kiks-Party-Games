const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Team = require('../models/Team');
const User = require('../models/User');
const Game = require('../models/Game');
const Room = require('../models/Room');

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

// Get a username from a team
router.get("/:username/", async (req, res, next) => {
    const { username } = req.params;
  
    try {
      const user = await User.find({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const team = await Team.find({ teamID: user.teamID });
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
  
      const { teamName, roomCode, teamScore } = team;
      const teamData = { teamname: teamName, teamscore: teamScore, roomcode: roomCode };
  
      return res.status(200).json(teamData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
})

// get the game with the most votes
router.get('/game', async (req, res) => {
    try {
      const games = await Game.find({});
      if (!games || games.length === 0) {
        return res.status(404).json({ error: 'No games found' });
      }
  
      let triviaCount = 0;
      let mathCount = 0;
      games.forEach(game => {
        if (game.game === 'Trivia') {
            triviaCount++;
        } else if (game.game === 'Math') {
            mathCount++;
        }
      });
  
      let winningGame = '';
      if (triviaCount > mathCount) {
        winningGame = 'Trivia';
      } else if (mathCount > triviaCount) {
        winningGame = 'Math';
      }
  
      return res.status(200).json({
        winningGame
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });


/* UPDATE Operations */

// join new team
router.put("/:username", async (req, res, next) => {
    const {username, teamname} = req.body;
    try{

        const user = await User.find({ username });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const team = await Team.find({ teamname });
        if (!team) {
          return res.status(404).json({ error: 'Team not found' });
        }
    
        user.teamID = team.teamID;
        await user.save();
    
        team.teamSize++;
        await team.save();
    
        return res.status(200).json({ message: 'Team updated successfully' });
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


/* POST Operations */


// POST a new team
router.post("/:username", async (req, res, next) => {
    const {username} = req.params;

    const newTeam = new Team({
        teamID: await getNextId(),
        teamName: `${username}'s team`,
        teamScore: 0,
        teamSize: 1,
    });

    await newTeam.save();

    const newUser = new User({
        username: username,
        teamID: newTeam.teamID,
        roomCode: 0000,
    });

    await newUser.save();

    console.log(`${username} has created a new team.`)
    return res.status(200).json({ message: `${username} has created a new team.` })
    }
);


// POST to join a room
router.post('/team/room', async (req, res) => {
    try {
      const { username, roomCode } = req.body;
  
      // Check if room exists
      const room = await Room.find({ code: roomCode });
      if (!room) {
        return res.status(400).json({ success: false, message: 'Room not found.' });
      }
  
      // Check if user already exists in the room
      const existingUser = await User.find({ username, room: room._id });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already in the room.' });
      }
  
      // Update the user's room
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { $set: { room: room._id } },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(400).json({ success: false, message: 'User not found.' });
      }
  
      return res.status(200).json({ success: true, message: 'User successfully joined the room.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// vote for games
router.post('/:game', async (req, res) => {
    const { username,} = req.body;
    const game = req.params;
  
    try {
      const user = await User.find({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const team = await Team.find({ teamID: user.teamID });
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
  
      const gameRecord = new Game({
        username: username,
        teamID: user.teamID,
        game: game,
      });
  
      await gameRecord.save();
  
      return res.status(200).json({ message: 'Game vote recorded successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
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
