const mongoose = require('mongoose')

const triviaTeamScoreSchema = new mongoose.Schema({
    teamname: String,
    teamScore: Number,
    teamid: Number
})

module.exports = mongoose.model('Trivia', triviaTeamScoreSchema)