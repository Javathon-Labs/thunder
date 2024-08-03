// schemas/ServerSettingsSchema.js
const mongoose = require('mongoose');

const ServerSettingsSchema = new mongoose.Schema({
  serverId: { type: String, required: true, unique: true },
  prefix: { type: String, required: true, default: '$' },
});

module.exports = mongoose.model('ServerSettings', ServerSettingsSchema)
