module.exports = {
  name: 'ban',
  description: 'Ban a user from the server.',
  usage: '.ban @user',
  async execute(message, args, client) {

    // Check if the user has the necessary permissions
    const permissionCheck = await message.member.getPermission();
    if (!permissionCheck.includes('CanKickMembers') && !message.member.isOwner) {
      const embed = {
        title: `Missing Permissons!`,
        description: `To use this command, You need the \`Kick/Ban Members\` permission!`,
        color: 0xFF3131,
        footer: {
            text: "Please try again with the correct perms.",
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
        "description": `To execute with this command, a **user** must be mentioned.`,
        "color": 0xFF3131,
        fields: [
            {
                name: "Usage",
                value: `\`\`\`.ban @username\`\`\``,
            }
        ],
        "footer": {
            "text": "Please try again."
        },
    }
      await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
      return;
    }


    try {
      // Ban the user
      await message.guild.createBan(guildID, user);

      // Send a message to the channel
      const embed = {
        "title": `Success!`,
        "description": `<@${user}> has been banned! `,
        "color": 0x39ff14,
      }
      await message.createMessage({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  }
};