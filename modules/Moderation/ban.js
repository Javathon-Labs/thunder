module.exports = {
  name: 'ban',
  description: 'Ban a user from the server.',
  usage: '$ban @user',
  async execute(message, args, client) {
    // Check if the user has the necessary permissions
    const permissionCheck = await message.member.getPermission();
    if (!permissionCheck.includes('CanKickMembers') && !message.member.isOwner) {
      throw new Error('Missing Permissions: To use this command, you need the "Kick/Ban Members" permission!');
    }

    // Get the user to be banned
    const user = message?.mentions?.users[0]?.id;
    if (!user) {
      throw new Error('To execute this command, a user must be mentioned. Usage: "$ban @username"');
    }

    try {
      // Ban the user
      await message.guild.createBan(message.guildID, user);

      // Send a success message to the channel
      const embed = {
        title: `Success!`,
        description: `<@${user}> has been banned! `,
        color: 0x39ff14,
      };
      await message.createMessage({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to ban user: ${error.message}`);
    }
  }
};