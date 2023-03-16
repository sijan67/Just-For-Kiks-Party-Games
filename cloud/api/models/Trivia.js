const mongoose = require('mongoose')

const triviaTeamScoreSchema = new mongoose.Schema({
    teamName: String,
    teamScore: Number,
    teamID: Number
})

module.exports = mongoose.model('Trivia', triviaTeamScoreSchema)