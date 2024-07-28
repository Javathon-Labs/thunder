const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  word: String,
});

module.exports = mongoose.model("Word", WordSchema);