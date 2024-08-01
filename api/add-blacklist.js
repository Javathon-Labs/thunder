const BadWord = require('../Schemas/BadWordSchema');
const express = require("express");
const router = express.Router();

// POST /api/servers/:serverid/blacklist/add/:word
router.post('/servers/:serverid/blacklist/add/:word', async (req, res) => {
  try {
    const { serverid, word } = req.params;

    if (!word) {
      return res.status(400).json({ error: 'Word is required.' });
    }

    // Check if the word already exists in the blacklist
    const existingWord = await BadWord.findOne({ serverId: serverid, word: word });
    if (existingWord) {
      return res.status(409).json({ error: 'This word is already in the blacklist.' });
    }

    // Create a new BadWord document
    const newBadWord = new BadWord({
      serverId: serverid,
      word: word
    });

    // Save the new bad word to the database
    await newBadWord.save();

    return res.status(201).json({ message: 'Word added to the blacklist successfully.', word: word });
  } catch (error) {
    console.error('Error adding word to blacklist:', error);
    return res.status(500).json({ error: 'An error occurred while adding the word to the blacklist.' });
  }
});

module.exports = router;
