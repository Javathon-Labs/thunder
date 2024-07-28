module.exports = {
    name: 'kick',
    description: 'kick a user from the server.',
    usage: '$kick @user',
    async execute(message, args, client) {
        // Check if the user has the necessary permissions
        const permissionCheck = await message.member.getPermission();
        if (!permissionCheck.includes('CanKickMembers') && !message.member.isOwner) {
            throw new Error('Missing Permissions: To use this command, you need the "Kick/Ban Members" permission!');
        }

        // Get the user to be kicked
        const user = message?.mentions?.users[0]?.id;
        if (!user) {
            throw new Error('To execute this command, a user must be mentioned. Usage: "$kick @username"');
        }

        try {
            // Kick the user
            await client.removeMember(message.guildID, user);

            // Send a success message to the channel
            const embed = {
                "title": `Success!`,
                "description": `<@${user}> has been kicked!`,
                "color": 0x39FF14,
            }
            await message.createMessage({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            throw new Error(`Failed to kick user: ${error.message}`);
        }
    }
}