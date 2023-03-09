const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    teamname: String,
    teamscore: String,
    roomcode: String
})

module.exports = UserSchema;