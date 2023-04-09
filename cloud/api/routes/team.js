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


// GET a team from a username
router.get('/username/:username', async (req, res) => {
    // const { username } = req.params;
  
    // try {
    //   const user = await User.findOne({ username });
  
    //   if (!user) {
    //     return res.status(404).json({ error: 'User not found' });
    //   }
  
    //   const pipeline = [
    //     {
    //       $match: {
    //         teamID: user.teamID
    //       }
    //     },
    //     {
    //       $project: {
    //         "teamName": 1,
    //         "teamScore": 1,
    //         "roomCode": 1
    //       }
    //     }
    //   ];
  
    //   const team = await Team.aggregate(pipeline);
  
    //   if (!team || team.length === 0) {
    //     return res.status(404).json({ error: 'Team not found' });
    //   }
  
    //   return res.status(200).json(team[0]);
    // } catch (err) {
    //   console.error(err);
    //   return res.status(500).json({ error: 'Internal server error' });
    // }
    const { username } = req.params;

    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const team = await Team.findOne({ teamID: user.teamID });
  
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
      
      console.log(team.teamName);
      console.log(user.roomCode);
      const result = {
        teamName: team.teamName,
        teamScore: team.teamScore,
        roomCode: user.roomCode,
      };
  
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// GET the game with the most votes
router.get('/game/votes', async (req, res) => {
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


// get the accumulated score of a game
router.get('/game/accumulate/score', (req, res) => {
    Team.find({}, 'teamScore')
        .then(score => {
            if (score === null || score.length === 0) {
                return res.status(404).json({ error: 'No games yet' });
            }
            let totalScore = 0; 
            let gameStatus = 'In game';
            score.forEach(score => {
                totalScore += score.teamScore;
            });
            if (totalScore >= 100) {
                gameStatus = 'Game over';
            } else {
                gameStatus = 'In game';
            }
            return res.status(200).json({
                totalScore: totalScore,
                status: gameStatus
            });
        }
    )  
});

/* UPDATE Operations */

// join new team
router.put("/username/:username", async (req, res, next) => {
    const {username} = req.params;
    const {teamName} = req.body;
    
    try{

        const user = await User.findOne({ username });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const team = await Team.findOne({ teamName });
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
router.post("/username/:username/", async (req, res, next) => {
    const {username} = req.params;
    const {teamName} = req.body;

    const newTeam = new Team({
        // teamID: await getNextId(),
        teamName: teamName,
        // teamScore: 0,
        // teamSize: 1,
    });

    newTeam.teamID = await getNextId();
    newTeam.teamScore = 0;
    newTeam.teamSize = 1;
 

    await newTeam.save();

    const newUser = new User({
        username: username,
        teamID: newTeam.teamID,
        roomCode: "0000",
    });

    await newUser.save();

    console.log(`${username} has created a new team.`);
    console.log(req.body.teamName);
    return res.status(200).json({ message: `${username} has created a new team.` });
    }
);


// POST to join a room
router.post('/room/:username', async (req, res) => {
   
      const { username } = req.params;
      const { roomCode } = req.body;
  
      // Check if room exists
      const room = await Room.find({ code: roomCode });
      if (!room) {
        return res.status(400).json({ success: false, message: 'Room not found.' });
      }

  
      // Update the user's room
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { $set: { roomcode: "0000"} }
      );
  
      if (!updatedUser) {
        return res.status(400).json({ success: false, message: 'User not found.' });
      }
  
      return res.status(200).json({ success: true, message: 'User successfully joined the room.' });
    
});

// POST a vote for games
router.post('/game/vote/:game', async (req, res) => {
    const { username } = req.body;
    const {game} = req.params;

   
    //   const user = await User.find({ username });
    //   if (!user) {
    //     return res.status(404).json({ error: 'User not found' });
    //   }
  
    //   const team = await Team.find({ teamID: user.teamID });
    //   if (!team) {
    //     return res.status(404).json({ error: 'Team not found' });
    //   }
    const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const gameRecord = new Game({
        username: username,
        teamID: user.teamID,
        game: game,
        status: 'voting'
      });
  
      await gameRecord.save();
  
    return res.status(200).json({ message: 'Game vote recorded successfully' });
    
});

// post to return to lobby or restart the game
router.post('/game/lobby/:option', async (req, res) => {
    const {option} = req.params;
    try{
      if (option === 'restart') {
        // Delete the team score and accumulated score but don't delete the team and user
          await Game.deleteMany({}); // Delete all game records
          await User.updateMany({}, { $unset: { roomCode: "" } }); // Remove the roomCode field from all user records
          await Team.updateMany({}, { $set: { teamScore: 0 } }); // Set the teamScore field to 0 for all team records
          return res.status(200).json({ message: 'Game restarted successfully' });
        
    } else {
        // Delete everything including the team and user
          await User.deleteMany({});
          await Team.deleteMany({});
          await Game.deleteMany({});
          return res.status(200).json({ message: 'Game ended successfully' });
      } 
    }catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    
});
    
  
/* DELETE Operations */

// DELETE one team
router.delete('/:teamID', async (req, res) => {
    try {
        const deletedTeam = await Team.deleteOne({teamID: req.params.teamID});
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
