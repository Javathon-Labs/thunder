const BadWord = require('../../Schemas/BadWordSchema');

module.exports = {
    name: 'blacklist',
    description: 'Manage blacklisted words for the server',
    usage: '$blacklist <add/remove/view> [word]',
    async execute(message, args, client) {
        try {
            // Check permissions
            const permissionCheck = await message.member.getPermission();
            if (!permissionCheck.includes('CanUpdateServer') && !message.member.isOwner) {
                throw new Error('Missing Permissions: To use this command, you need the `Manage Server` permission!');
            }


            // Remove the command itself from args if it's present
            if (args[0].toLowerCase() === '$blacklist') {
                args.shift();
            }

            // Check for valid usage
            if (args.length < 1) {
                throw new Error('Invalid usage. Please use "$blacklist <add/remove/view> [word]"');
            }

            const action = args[0].toLowerCase();
            const word = args.slice(1).join(' '); // Join the rest of the arguments as the word
            const serverId = message.guildID;

            switch (action) {
                case 'add':
                    return addWord(message, word, serverId);
                case 'remove':
                    return removeWord(message, word, serverId);
                case 'view':
                    return viewWords(message, serverId);
                default:
                    throw new Error('Invalid action. Please use "add, remove, or view."');
            }
        } catch (error) {
            console.error('Error in blacklist command:', error);
            throw new Error(`An error occurred: ${error.message}`);
        }
    },
};

async function addWord(message, word, serverId) {
    if (!word) {
        throw new Error('Please provide a word to blacklist.');
    }

    try {
        const existingWord = await BadWord.findOne({ serverId, word });
        if (existingWord) {
            throw new Error('This word has already been blacklisted.');
        }

        const newBadWord = new BadWord({ serverId, word });
        await newBadWord.save();

        const embed = {
            title: 'Success!',
            description: `The word "${word}" has been blacklisted in this server.`,
            color: 0x39ff14,
        };
        await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
    } catch (error) {
        console.error('Error adding word:', error);
        throw new Error(`An error occurred while adding the word: ${error.message}`);
    }
}

async function removeWord(message, word, serverId) {
    if (!word) {
        throw new Error('Please provide a word to remove from the blacklist.');
    }

    try {
        const result = await BadWord.findOneAndDelete({ serverId, word });

        if (!result) {
            throw new Error('This word is not blacklisted.');
        }

        const embed = {
            title: 'Done!',
            description: `The word "${word}" has been removed from the blacklist.`,
            color: 0x39ff14,
        };
        await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
    } catch (error) {
        console.error('Error removing word:', error);
        throw new Error(`An error occurred while removing the word: ${error.message}`);
    }
}

async function viewWords(message, serverId) {
    try {
        const badWords = await BadWord.find({ serverId });

        if (badWords.length === 0) {
            throw new Error('There are no blacklisted words for this server.');
        }

        const wordList = badWords.map((bw, index) => `${index + 1}. \`${bw.word}\``).join('\n');

        const embed = {
            title: 'Blacklisted Words ⬇',
            description: wordList,
            color: 0x0000FF,
        };
        await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
    } catch (error) {
        console.error('Error fetching blacklisted words:', error);
        throw new Error(`An error occurred while fetching the blacklisted words: ${error.message}`);
    }
}