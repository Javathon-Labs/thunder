const express = require('express');
const router = express.Router();
const ServerSettings = require('../Schemas/SettingsSchema');

// API endpoint to update server prefix
router.patch('/servers/:serverId/prefix/:prefix', async (req, res) => {
  try {
    const { serverId, prefix } = req.params;
    const serverSettings = await ServerSettings.findOneAndUpdate(
      { serverId },
      { prefix },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ message: `Prefix updated to ${serverSettings.prefix}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;