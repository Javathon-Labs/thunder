const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  serverId: String,
  word: String,
});

module.exports = mongoose.model("Word", WordSchema);
