const mongoose = require('mongoose')

const mathTeamScoreSchema = new mongoose.Schema({
    teamname: String,
    teamScore: Number,
})

module.exports = mongoose.model('Math', mathTeamScoreSchema)