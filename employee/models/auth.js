const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },

  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },

  password: {
    type: String,
    required: true,
    max: 2048,
    min: 8
  },

  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("Auth", authSchema);

module.exports = User;
