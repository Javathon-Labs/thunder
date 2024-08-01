const BadWord = require('../Schemas/BadWordSchema');
const express = require("express");
const router = express.Router();

router.delete('/servers/:serverid/blacklist/remove/:word', async (req, res) => {
  try {
    const { serverid, word } = req.params;

    const deletedWord = await BadWord.findOneAndDelete({ serverId: serverid, word: word });

    if (!deletedWord) {
      return res.status(404).json({ error: 'This word is not in the blacklist.' });
    }

    return res.status(200).json({ message: `The word "${word}" has been removed from the blacklist.` });
  } catch (error) {
    console.error('Error removing word from blacklist:', error);
    return res.status(500).json({ error: 'An error occurred while removing the word from the blacklist.' });
  }
});

module.exports = router;