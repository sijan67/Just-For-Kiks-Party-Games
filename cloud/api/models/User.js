const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    teamname: String,
    roomcode: Number
})

module.exports = mongoose.model('User',UserSchema);