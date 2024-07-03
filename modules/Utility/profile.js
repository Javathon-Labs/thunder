module.exports = {
    name: `profile`,
    description: `Get information on a user.`,
    usage: ``,
    async execute(message, args, client) {
        console.log(client.guilds)
        const embed = {
            title: `<@${message.member.id}>`,
            color: 0xEAD5FF,
            fields: [
                {
                    name: "Account Details",
                    value: `\`\`\`ID: ${message.member.id} \nAccount Created: ${message.member.createdAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })} \nServer Joined: ${message.member.joinedAt.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}\`\`\``,
                },
                {
                    name: "Roles",
                    value: `${message.member.roles.map(role => `<@&${role}>`).join(', ')}`
                }
            ],
            thumbnail: {
                url: `${message.member.avatarURL}`
            }
        };
        await message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isSilent: true });
    }
};