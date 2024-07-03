module.exports = {
    name: 'kick',
    description: 'kick a user from the server.',
    usage: '!kick @user [reason]',
    async execute(message, args, client) {
        console.log(message.member);

        // Check if the user has the necessary permissions
        const permissionCheck = await message.member.getPermission();
        if (!permissionCheck.includes('CanKickMembers') && !message.member.isOwner) {
            const embed = {
                title: `Error!`,
                description: `To use this command, the \`CanKickMembers\` permission is required.`,
                color: 0xFF3131,
                footer: {
                    text: "Please try again with the correct permissions.",
                }
            }
            await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
            return;
        }

        // Get the user to be banned
        const user = message?.mentions?.users[0].id;
        if (!user) {
            const embed = {
                "title": `Error!`,
                "description": `To continue with this command, a **user** must be mentioned.`,
                "color": 0xFF3131,
                "footer": {
                    "text": "Please try again."
                },
            }
            await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
            return;
        }

        try {
            // Ban the user
            await client.removeMember(message.guildID, user);

            // Send a message to the channel
            const embed = {
                "title": `Success!`,
                "description": `<@${user}> has been kicked!`,
                "color": 0x39FF14,
            }
            await message.createMessage({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    }
};