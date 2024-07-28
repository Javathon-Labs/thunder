const mongoose = require("mongoose");
const Warning = require(`../../Schemas/WarningSchema.js`);

module.exports = {
    name: "delwarn",
    description: "Delete warnings for a user",
    usage: "`$delwarn [@username] [number]`",
    async execute(message, args, client) {
        const permissionCheck = await message.member.getPermission();
        if (!permissionCheck.includes('CanUpdateServer') && !message.member.isOwner) {
            throw new Error('Missing Permissions: To use this command, you need the "Manage Server" permission!');
        }

        try {
            const targetId = message?.mentions?.users[0]?.id;
            if (!targetId) {
                throw new Error('Please mention a user to delete warnings.');
            }

            // Check if the command format is correct
            const secondArg = args[2];
            const numToDelete = parseInt(secondArg);
            if (isNaN(numToDelete) || numToDelete <= 0) {
                throw new Error('Please provide a valid number of warnings to delete.');
            }

            const warnings = await Warning.find({ userId: targetId }).sort({ _id: 1 }).limit(numToDelete);

            if (warnings.length > 0) {
                const warningIds = warnings.map((warning) => warning.warningId);
                await Warning.deleteMany({ _id: { $in: warnings.map((warning) => warning._id) } });

                const deletedEmbed = {
                    title: "Deleted!",
                    description: `Deleted ${warnings.length} warning(s) for <@${targetId}>.`,
                    color: 0x39ff14,
                };
                await message.createMessage({ embeds: [deletedEmbed], replyMessageIds: [message.id] });
            } else {
                throw new Error('No warnings found for this user.');
            }
        } catch (error) {
            console.error(error);
            throw new Error(`An error occurred while executing the command: ${error.message}`);
        }
    },
}