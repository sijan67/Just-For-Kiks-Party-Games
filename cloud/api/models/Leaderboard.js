const mongoose = require('mongoose')

const LeaderboardSchema = new mongoose.Schema({
    teamname: String,
    teamScore: Number
})

module.exports = mongoose.model('Leaderboard', LeaderboardSchema)