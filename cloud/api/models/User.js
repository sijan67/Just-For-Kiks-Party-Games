const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    teamID: String,
    roomCode: String,
})

module.exports = mongoose.model('User',UserSchema);