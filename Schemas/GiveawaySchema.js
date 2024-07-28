// Schemas/GiveawaySchema.js
const mongoose = require("mongoose");

const GiveawaySchema = new mongoose.Schema({
  giveawayId: String,
  endTime: Date,
  winnerCount: Number,
  prize: String,
  participants: [String],
  serverId: String,
  channelId: String,
  messageId: String,
});

module.exports = mongoose.model("Giveaway", GiveawaySchema);