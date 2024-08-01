const BadWord = require('../Schemas/BadWordSchema');
const express = require("express");
const router = express.Router();

router.post('/servers/:serverid/blacklist/add', async (req, res) => {
    try {
        const { serverid } = req.params;
        const { words } = req.body;

        console.log('Request params:', req.params);

        // Check if the words are already in the blacklist
        const existingWords = await BadWord.find({ serverId: serverid, word: { $in: words } });
        const existingWordSet = new Set(existingWords.map(w => w.word));
        const newWords = words.filter(w => !existingWordSet.has(w));

        // Create new bad word documents and save them to the database
        const newBadWords = newWords.map(word => new BadWord({ serverId: serverid, word }));
        await BadWord.insertMany(newBadWords);

        return res.status(201).json({ message: `The words "${newWords.join(', ')}" have been added to the blacklist.` });
    } catch (error) {
        console.error('Error adding words to blacklist:', error);
        return res.status(500).json({ error: 'An error occurred while adding the words to the blacklist.' });
    }
});

module.exports = router;
