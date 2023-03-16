const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    teamname: String,
    teamScore: Number,
    teamID: Number
})

module.exports = mongoose.model('Team', TeamSchema)