module.exports = {
  name: 'ban',
  description: 'Ban a user from the server.',
  usage: '!ban @user [reason]',
  async execute(message, args, client) {
    console.log(message);

    // Check if the user has the necessary permissions
    const permissionCheck = await message.member.getPermission();
    if (!permissionCheck.includes('CanKickMembers') && !message.member.isOwner) {
      const embed = {
        "title": `Oh no!`,
        "description": `To use this command, the \`CanKickMembers\` permission is required.`,
        "color": 0xFF3131,
        "footer": {
          "text": "Please try again with the correct permissions."
        },
      }
      await message.createMessage({ embeds: [embed] });
      return;
    }

    // Get the user to be banned
    const user = message?.mentions?.users[0].id;
    if (!user) {
      const embed = {
        "title": `False Command Usage!`,
        "description": `To execute this command, a **user** must be mentioned.`,
        "color": 0xFF3131,
        "footer": {
          "text": "Please try again."
        },
      }
      await message.createMessage({ embeds: [embed] });
      return;
    }

    // Get the reason for the ban
    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      // Ban the user
      await message.guild.createBan(user, reason);

      // Send a message to the channel
      const embed = {
        "title": `Success!`,
        "description": `<@${user}> has been banned!`,
        "color": 0x39FF14,
      }
      await message.createMessage({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  }
};