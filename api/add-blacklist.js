const BadWord = require('../Schemas/BadWordSchema');
const express = require("express");
const router = express.Router();

// POST /server/:serverid/blacklist/add/:word
router.post('/server/:serverid/blacklist/add/:word', async (req, res) => {
  try {
    const { serverid, word } = req.params;

    // Check if the word is already in the blacklist for the server
    const existingWord = await BadWord.findOne({ serverId: serverid, word: word });
    if (existingWord) {
      return res.status(400).json({ error: 'The word is already blacklisted for this server.' });
    }

    // Create a new blacklisted word document
    const newBadWord = new BadWord({
      serverId: serverid,
      word: word
    });

    await newBadWord.save();

    return res.status(201).json(newBadWord);
  } catch (error) {
    console.error('Error adding blacklisted word:', error);
    return res.status(500).json({ error: 'An error occurred while adding the blacklisted word.' });
  }
});

module.exports = router;
