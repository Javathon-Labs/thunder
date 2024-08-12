const mongoose = require("mongoose");
const Warning = require(`../../Schemas/WarningSchema.js`);
const colors = require('../../config/config.json').colors;6786

module.exports = {
    name: "warnings",
    description: "Check the number of warnings for a user",
    usage: "`$warnings [@username]`",
    async execute(message, args, client) {
        // Check if the user has the required permissions
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
            // Check if a user is mentioned
            const targetUser = message.mentions?.users[0]
            if (!targetUser) {
                const embed = {
                    title: 'Missing Arguments!',
                    description: "**You are missing arguments!**",
                    fields: [
                        {
                            name: 'Error',
                            value: 'a `userID` is a required argument that was missing. \n\nDont know how to get a userID? You can follow the tutorial [here](https://support.guilded.gg/hc/en-us/articles/6183962129303-Developer-mode).',
                        },
                    ],
                    color: colors.red,
                };
                return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
            }

            const targetId = targetUser.id;

            // Fetch warnings from the database
            const warnings = await Warning.find({ userId: targetId });

            // Respond with the number of warnings
            const warningCount = warnings.length;
            const embed = {
                title: `Warnings`,
                description: `<@${targetId}> has ${warningCount} warning${warningCount !== 1 ? 's' : ''}.`,
            };
            await message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isSilent: true });
        } catch (error) {
            throw new Error(error);
        }
    },
}