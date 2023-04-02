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


// POST a new team
router.post("/:username", async (req, res, next) => {
    const {username} = req.params.username;
    const { teamName } = req.body;

    const teams = await Team.find()
    
    if (teams.length === 0) {

        getNextId().then(id => {
            const newTeam = new Team({
            teamID: id,
            teamName: `${username}'s team`,
            teamScore: 0,
            teamSize: 1,
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
    
        const newUser = new User({
          username: username,
          teamID: newTeam.teamID,
          roomCode: 0000
        })
        newUser.save().then(result => {
            res.status(201).json(result);
        }).catch(err => {
            console.error(err);
            res.status(500).send("Internal server error");
        });
      
    
        console.log(`${username} has created a new team.`)
        return res.status(200).json({ message: `${username} has created a new team.` })
    }

    if (teams.length == 1) {
        const choice = req.body.choice;
        if (choice === 'create') {
            getNextId().then(id => {
                const newTeam = new Team({
                teamID: id,
                teamName: `${username}'s team`,
                teamScore: 0,
                teamSize: 1,
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
        
            const newUser = new User({
            username: username,
            teamID: newTeam.teamID,
            roomCode: 0000
            })
            newUser.save().then(result => {
                res.status(201).json(result);
            }).catch(err => {
                console.error(err);
                res.status(500).send("Internal server error");
            });
        
        
            console.log(`${username} has created a new team.`)
            return res.status(200).json({ message: `${username} has created a new team.` })
        } else if (choice === 'join') {
            const team = teams[0];
            team.teamSize ++;
            Team.updateOne({ teamID: team.teamID }, { $set: { teamSize: team.teamSize } });

            const newUser = new User({
                username: username,
                teamID: newTeam.teamID,
                roomCode: 0000
            })
            newUser.save().then(result => {
                res.status(201).json(result);
            }).catch(err => {
                console.error(err);
                res.status(500).send("Internal server error");
            });

            console.log(`${username} has joined ${team.teamName}.`)
            return res.status(200).json({ message: `${username} has joined ${team.teamName}.` })
        } else {
            return res.status(400).json({ error: 'Invalid choice.' })
        }
    }

    if (teams.length == 2) {
        const choice = req.body;

        const team1 = teams[0]
        const team2 = teams[1]

        if (choice === team1.teamName) {
            team1.teamSize++
            await Team.updateOne({ teamID: team1.teamID }, { $set: { teamSize: team1.teamSize, members: team1.members } })

            const newUser = new User({
                username: playerName,
                teamID: team1.teamID,
                roomCode: 0000,
            })
            newUser.save().then(result => {
                res.status(201).json(result);
            }).catch(err => {
                console.error(err);
                res.status(500).send("Internal server error");
            });

            console.log(`${username} has joined ${team1.teamName}.`)
            return res.status(200).json({ message: `${username} has joined ${team1.teamName}.` })
        } else if (choice === team2.teamName) {
            team2.teamSize++
            await Team.updateOne({ teamID: team2.teamID }, { $set: { teamSize: team2.teamSize, members: team2.members } })

            const newUser = new User({
                username: playerName,
                teamID: team2.teamID,
                roomCode: 0000,
            })
            newUser.save().then(result => {
                res.status(201).json(result);
            }).catch(err => {
                console.error(err);
                res.status(500).send("Internal server error");
            });

            console.log(`${username} has joined ${team2.teamName}.`)
            return res.status(200).json({ message: `${username} has joined ${team2.teamName}.` })
        } else {
            return res.status(400).json({ error: 'Invalid choice.' })
        }
    }
});

// Get a username from a team
router.get("/:username/", async (req, res, next) => {
    const { username } = req.params;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const team = await Team.findOne({ teamID: user.teamID });
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
  });


// DELETE all teams
router.delete('/teams', async (req, res, next) => {
    try {
      await Team.deleteMany();
      res.status(200).json({ message: 'All teams have been deleted.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;