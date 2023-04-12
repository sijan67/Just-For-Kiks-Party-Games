const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  code: String,
  ready: {
    type: String,
    default: 'false'
 },
});

module.exports = mongoose.model('Room', RoomSchema);