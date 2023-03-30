const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    teamID: String,
    roomCode: Number,
})

module.exports = mongoose.model('User',UserSchema);