const { v4: uuidv4 } = require('uuid');
const Warning = require('../../Schemas/WarningSchema');

module.exports = {
    name: "warn",
    description: "Warn a user",
    usage: "`$warn [@username]`",
    async execute(message, args, client) {
        // Check if the user has the required permissions
        const permissionCheck = await message.member.getPermission();
        if (!permissionCheck.includes('CanUpdateServer') && !message.member.isOwner) {
            throw new Error('Missing Permissions: To use this command, you need the "Manage Server" permission!');
        }

        try {
            // Check if a user is mentioned
            const targetUser = message?.mentions?.users[0];
            if (!targetUser) {
                throw new Error("No user mentioned.");
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
            console.error("Error in warn command:", error);
            throw new Error(`An error occurred: ${error.message}`);
        }
    },
};