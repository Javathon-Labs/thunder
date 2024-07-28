const BadWord = require('../Schemas/BadWordSchema');
const express = require("express");
const router = express.Router();


router.post('/servers/:serverid/blacklist/add/:word', async (req, res) => {
    try {
      const { serverid, word } = req.params;
  
      const existingWord = await BadWord.findOne({ serverId: serverid, word: word });
      if (existingWord) {
        return res.status(400).json({ error: 'This word has already been blacklisted.' });
      }
  
      const newBadWord = new BadWord({ serverId: serverId, word: word });
      await newBadWord.save();
  
      return res.status(201).json({ message: `The word [${word}] has been added to the blacklist.` });
    } catch (error) {
      console.error('Error adding word to blacklist:', error);
      return res.status(500).json({ error: 'An error occurred while adding the word to the blacklist.' });
    }
  });

  module.exports = router;