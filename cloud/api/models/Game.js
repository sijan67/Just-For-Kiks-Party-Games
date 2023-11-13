const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    username: String,
    teamID: String,
    game: String,
    status: String
})

module.exports = mongoose.model('Game',GameSchema);