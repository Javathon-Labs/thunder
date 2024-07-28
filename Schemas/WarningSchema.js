// WarningSchema.js
const mongo = require('mongoose');

const warningSchema = new mongo.Schema({
  userId: { type: String, required: true },
  reason: { type: String, default: "None" },
  warningId: { type: String, required: true },
});

module.exports = mongo.models.WarningSystem || mongo.model('WarningSystem', warningSchema);