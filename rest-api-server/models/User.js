require('../db/dbconn');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  playedGames: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
});

module.exports = new mongoose.model('UserSchema', UserSchema);
