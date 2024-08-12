const { v4: uuidv4 } = require('uuid');
const Warning = require('../../Schemas/WarningSchema');
const colors = require('../../config/config.json').colors;

module.exports = {
    name: "warn",
    description: "Warn a user",
    usage: "`$warn [@username]`",
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
            const targetUser = message.mentions?.users[0];
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

            const reason = args.slice(1).join(" ") || "None";

            // Save the warning to MongoDB
            const warning = new Warning({
                userId: targetId,
                reason,
                warningId: uuidv4().substr(0, 8),
            });
            await warning.save();

            const warningCount = await Warning.countDocuments({ userId: targetId });

            const successEmbed = {
                title: `Warning! (${warning.warningId})`,
                description: `<@${targetId}> has been warned!`,
                color: 0x39ff14,
                footer: {
                    text: `Total Warnings: ${warningCount}`,
                },
            };
            await message.createMessage({ embeds: [successEmbed], replyMessageIds: [message.id] });

            if (warningCount >= 3) {
                await client.removeMember(message.guildID, targetId);

                const kickedEmbed = {
                    title: "User Kicked!",
                    description: `<@${targetId}> has been kicked for having too many warnings.`,
                    color: 0x39ff14,
                };
                await message.createMessage({ embeds: [kickedEmbed], replyMessageIds: [message.id] });
            }
        } catch (error) {
            console.error(error);
            throw new Error(`${error.message}`);
        }
    },
};