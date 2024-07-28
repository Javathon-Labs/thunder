const express = require('express');
const router = express.Router();
const ServerSettings = require('../Schemas/SettingsSchema');

// API endpoint to get server information for a specific server
router.get('/servers/:serverId', async (req, res) => {
  try {
    const { serverId } = req.params;
    const serverSettings = await ServerSettings.findOne({ serverId }, { _id: 0, serverId: 1, prefix: 1 });

    if (!serverSettings) {
      return res.status(404).json({ message: 'Server not found' });
    }

    res.json(serverSettings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;