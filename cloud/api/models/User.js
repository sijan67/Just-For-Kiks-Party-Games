const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    teamID: String,
    roomCode: Number,
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
})

module.exports = mongoose.model('User',UserSchema);