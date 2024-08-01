const express = require("express");
const BadWord = require('../Schemas/BadWordSchema');
const router = express.Router();

router.post('/servers/:serverid/blacklist/add', async (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Raw body:', req.body);
  console.log('Word:', req.body.word);

  const word = req.body.word;
  if (!word) {
    return res.status(400).json({ error: 'Word is required in the request body.' });
  }

  try {
    const { serverid } = req.params;

    const existingWord = await BadWord.findOne({ serverId: serverid, word: word });
    if (existingWord) {
      return res.status(400).json({ error: 'This word is already in the blacklist.' });
    }

    const newWord = new BadWord({ serverId: serverid, word: word });
    await newWord.save();

    console.log(`The word "${word}" has been added to the blacklist for server ${serverid}.`);

    return res.status(201).json({ message: `The word "${word}" has been added to the blacklist.` });
  } catch (error) {
    console.error('Error adding word to blacklist:', error);
    return res.status(500).json({ error: 'An error occurred while adding the word to the blacklist.' });
  }
});

module.exports = router;
