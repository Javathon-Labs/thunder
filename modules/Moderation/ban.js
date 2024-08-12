const colors = require('../../config/config.json').colors;

module.exports = {
  name: 'ban',
  description: 'Ban a user from the server.',
  usage: '$ban @user',
  async execute(message, args, client) {
    // Check if the user has the necessary permissions
    const permissionCheck = await message.member.getPermission();
    if (!permissionCheck.includes('CanKickMembers') && !message.member.isOwner) {
      const embed = {
        title: 'Missing Permissions!',
        description: 'To use this command, you need the `Kick/Ban Members` permission!',
        color: colors.red,
        footer: {
          text: `Please try again later.`
      }
      };
      await message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
      return;
    }

    // Get the user to be banned
    const user = message.mentions?.users[0].id;
    if (!user) {
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

    try {
      // Ban the user
      await client.createBan(message.guildID, user);

      // Send a success message to the channel
      const embed = {
        title: `Success!`,
        description: `<@${user}> has been banned!`,
        color: 0x39ff14,
      };
      await message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isSilent: true });
    } catch (error) {
      console.error(error);
      const embed = {
        title: 'Error',
        description: `Failed to ban user: ${error.message}`,
        color: 0xff0000,
      };
      await message.createMessage({ embeds: [embed], isSilent: true });
    }
  }
}