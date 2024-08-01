const express = require("express");
const BadWord = require('../Schemas/BadWordSchema');
const router = express.Router();

// Ensure body parsing middleware is set up
const app = express();
app.use(express.json());

// Endpoint to add a word to the blacklist and log it
router.post('/servers/:serverid/blacklist/add', async (req, res) => {
  // Log the request body for debugging
  console.log('Request body:', req.body);

  // Validate the request body
  const word = req?.body?.word;
  if (!word) {
    return res.status(400).json({ error: 'Word is required in the request body.' });
  }

  try {
    const { serverid } = req.params;

    // Check if the word already exists in the blacklist
    const existingWord = await BadWord.findOne({ serverId: serverid, word: word });
    if (existingWord) {
      return res.status(400).json({ error: 'This word is already in the blacklist.' });
    }

    // Add the word to the blacklist
    const newWord = new BadWord({ serverId: serverid, word: word });
    await newWord.save();

    // Log the addition
    console.log(`The word "${word}" has been added to the blacklist for server ${serverid}.`);

    return res.status(201).json({ message: `The word "${word}" has been added to the blacklist.` });
  } catch (error) {
    console.error('Error adding word to blacklist:', error);
    return res.status(500).json({ error: 'An error occurred while adding the word to the blacklist.' });
  }
});

module.exports = router;
