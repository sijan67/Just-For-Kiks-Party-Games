const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
  ready: {
    type: string,
    default: 'false'
 },
});

module.exports = mongoose.model('Room', RoomSchema);