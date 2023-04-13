const mongoose = require("mongoose");

const BuzzerSchema = new mongoose.Schema({
  pressed: {
    type: Boolean,
    default: false
  },
  teamID: {
    type: String,
    default: null
  },
  questionID: Number,
  display: String
});

module.exports = mongoose.model("Buzzer", BuzzerSchema);