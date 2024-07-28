const BadWord = require('../Schemas/BadWordSchema');
const express = require("express");
const router = express.Router();

// GET /api/servers/:serverid/blacklist
router.get('/servers/:serverid/blacklist', async (req, res) => {
  try {
    const { serverid } = req.params;
    const badWords = await BadWord.find({ serverId: serverid });

    if (badWords.length === 0) {
      return res.status(404).json({ error: 'No blacklisted words found for this server.' });
    }

    const response = {
      'serverId': serverid,
      'words': badWords.map(bw => bw.word)
    };

    return res.json(response);
  } catch (error) {
    console.error('Error fetching blacklisted words:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the blacklisted words.' });
  }
});

module.exports = router;
