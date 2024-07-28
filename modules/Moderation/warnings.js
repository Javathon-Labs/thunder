const mongoose = require("mongoose");
const Warning = require(`../../Schemas/WarningSchema.js`);

module.exports = {
    name: "warnings",
    description: "Check the number of warnings for a user",
    usage: "`$warnings [@username]`",
    async execute(message, args, client) {
        // Check if the user has the required permissions
        const permissionCheck = await message.member.getPermission();
        if (!permissionCheck.includes('CanUpdateServer') && !message.member.isOwner) {
            throw new Error('Missing Permissions: To use this command, you need the "Manage Server" permission!');
        }

        try {
            // Check if a user is mentioned
            const targetUser = message?.mentions?.users[0]
            if (!targetUser) {
                throw new Error('Please mention a user to check warnings.');
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
            await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
        } catch (error) {
            throw new Error(error);
        }
    },
}