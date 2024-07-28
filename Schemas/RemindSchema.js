const mongo = require('mongoose');

const reminderSchema = new mongo.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, required: true },
  reminderId: { type: String, required: true },
});

module.exports = mongo.model(`Reminder`, reminderSchema)