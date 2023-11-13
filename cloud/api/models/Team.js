const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    teamID: Number,
    teamName: String,
    teamScore: Number,
    teamSize: Number,
})

module.exports = mongoose.model('Team', TeamSchema)