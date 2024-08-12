const BadWord = require('../../Schemas/BadWordSchema');
const colors = require('../../config/config.json').colors;

module.exports = {
    name: 'blacklist',
    description: 'Manage blacklisted words for the server',
    usage: '$blacklist <add/remove/view> [word]',
    async execute(message, args, client) {
        try {
            // Check permissions
            const permissionCheck = await message.member.getPermission();
            if (!permissionCheck.includes('CanUpdateServer') && !message.member.isOwner) {
                const embed = {
                    title: 'Missing Permissions!',
                    description: 'To use this command, you need the `Update Server` permission!',
                    color: colors.red,
                    footer: {
                        text: 'Please try again later.'
                    }
                };
                await message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
                return;
            }

            // Remove the command itself from args if it's present
            if (args[0].toLowerCase() === '$blacklist') {
                args.shift();
            }

            // Check for valid usage
            if (args.length < 1) {
                const embed = {
                    title: 'Invalid Usage!',
                    description: 'It seems you aren\'t using this command right. Please follow the example below for a headstart!',
                    fields: [
                        {
                            name: 'Usage',
                            value: '```$blacklist <add | view | remove>```'
                        }
                    ],
                    color: colors.red,
                    footer: {
                        text: 'Please try again later.'
                    }
                };
                await message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
                return;
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
                    const embed = {
                        title: 'Missing Arguments!',
                        description: '**You are missing arguments!**',
                        fields: [
                            {
                                name: 'Error',
                                value: 'An `action` is a required argument that was missing. \n\nDon\'t know which action to use? It\'s either `add`, `remove`, or `view`.'
                            }
                        ],
                        color: colors.red
                    };
                    return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
            }
        } catch (error) {
            console.error(error);
            throw new Error(`${error.message}`);
        }
    }
};

async function addWord(message, word, serverId) {
    if (!word) {
        const embed = {
            title: 'Missing Arguments!',
            description: '**You are missing arguments!**',
            fields: [
                {
                    name: 'Error',
                    value: 'A `word` is a required argument that was missing.'
                }
            ],
            color: colors.red
        };
        return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
    }

    try {
        const existingWord = await BadWord.findOne({ serverId, word });
        if (existingWord) {
            const embed = {
                title: 'Error!',
                description: '**An error occurred while blacklisting your word!**',
                fields: [
                    {
                        name: 'Error',
                        value: 'This word is already blacklisted.'
                    }
                ],
                color: colors.red
            };
            return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
        }

        const newBadWord = new BadWord({ serverId, word });
        await newBadWord.save();

        const embed = {
            title: 'Success!',
            description: `\`${word}\` has been blacklisted in this server.`,
            color: colors.red,
        };
        await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
    } catch (error) {
        console.error(error);
        throw new Error(`${error.message}`);
    }
}

async function removeWord(message, word, serverId) {
    if (!word) {
        const embed = {
            title: 'Missing Arguments!',
            description: '**You are missing arguments!**',
            fields: [
                {
                    name: 'Error',
                    value: 'A `word` is a required argument that was missing.'
                }
            ],
            color: colors.red
        };
        return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
    }

    try {
        const result = await BadWord.findOneAndDelete({ serverId, word });

        if (!result) {
            const embed = {
                title: 'Error!',
                description: '**An error occurred while removing your word!**',
                fields: [
                    {
                        name: 'Error',
                        value: 'This word is not blacklisted.'
                    }
                ],
                color: colors.red
            };
            return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
        }

        const embed = {
            title: 'Done!',
            description: `\`${word}\` has been removed from the blacklist.`,
            color: 0x39ff14
        };
        await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
    } catch (error) {
        console.error(error);
        throw new Error(`${error.message}`);
    }
}

async function viewWords(message, serverId) {
    try {
        const badWords = await BadWord.find({ serverId });

        if (badWords.length === 0) {
            const embed = {
                title: 'Error!',
                description: '**An error occurred while viewing your words!**',
                fields: [
                    {
                        name: 'Error',
                        value: 'There are no words blacklisted in the server.'
                    }
                ],
                color: colors.red
            };
            return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
        }

        const wordList = badWords.map((bw, index) => `${index + 1}. \`${bw.word}\``).join('\n');

        const embed = {
            title: 'Blacklisted Words ⬇',
            description: wordList,
            color: 0x0000FF
        };
        await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
    } catch (error) {
        console.error(error);
        throw new Error(`${error.message}`);
    }
}