const express = require('express');
const router = express.Router();
const ServerSettings = require('../Schemas/SettingsSchema');

// API endpoint to get server information
router.get('/servers', async (req, res) => {
  try {
    const serverSettings = await ServerSettings.find({}, { _id: 0, serverId: 1, prefix: 1 });
    res.json(serverSettings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
