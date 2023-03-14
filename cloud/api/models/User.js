const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    teamname: String,
    teamscore: Number,
    roomcode: Number
})

module.exports = mongoose.model('User',UserSchema);