const mongoose = require("mongoose");
const Warning = require('../../Schemas/WarningSchema.js');
const colors = require('../../config/config.json').colors;

module.exports = {
    name: "delwarn",
    description: "Delete warnings for a user",
    usage: "`$delwarn [@username] [number]`",
    async execute(message, args, client) {
        const permissionCheck = await message.member.getPermission();
        if (!permissionCheck.includes('CanUpdateServer') && !message.member.isOwner) {
            const embed = {
                title: 'Missing Permissions!',
                description: 'To use this command, you need the `Manage Server` permission!',
                color: colors.red,
                footer: {
                    text: 'Please try again later.'
                }
            };
            return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
        }

        try {
            const targetId = message.mentions?.users[0].id;
            if (!targetId) {
                const embed = {
                    title: 'Missing Arguments!',
                    description: '**You are missing arguments!**',
                    fields: [
                        {
                            name: 'Error',
                            value: 'A `userID` is a required argument that was missing. \n\nDon\'t know how to get a userID? You can follow the tutorial [here](https://support.guilded.gg/hc/en-us/articles/6183962129303-Developer-mode).'
                        }
                    ],
                    color: colors.red
                };
                return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
            }

            // Check if the command format is correct
            const secondArg = args[2];
            const numToDelete = parseInt(secondArg);
            if (isNaN(numToDelete) || numToDelete <= 0) {
                const embed = {
                    title: 'Missing Arguments!',
                    description: '**You are missing arguments!**',
                    fields: [
                        {
                            name: 'Error',
                            value: 'A `number` is a required argument that was missing.'
                        }
                    ],
                    color: colors.red
                };
                return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
            }

            const warnings = await Warning.find({ userId: targetId }).sort({ _id: 1 }).limit(numToDelete);

            if (warnings.length > 0) {
                await Warning.deleteMany({ _id: { $in: warnings.map((warning) => warning._id) } });

                const deletedEmbed = {
                    title: "Deleted!",
                    description: `Deleted ${warnings.length} warning(s) for <@${targetId}>.`,
                    color: 0x39ff14
                };
                await message.createMessage({ embeds: [deletedEmbed], isSilent: true });
            } else {
                const embed = {
                    title: 'Error!',
                    description: 'No warnings found for this user.',
                    color: colors.red
                };
                return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
            }
        } catch (error) {
            console.error(error);
            throw new Error(error.message)      
        }
    }
};