// schemas/BadWordSchema.js
const mongoose = require('mongoose');

const BadWordSchema = new mongoose.Schema({
  serverId: String,
  word: String
});

module.exports = mongoose.model('BadWord', BadWordSchema);