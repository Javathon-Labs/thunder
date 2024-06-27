const colors = require("../../config/config.json")

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server.',
    usage: '<@user> [reason]',
    async execute(message, args, client) {
      console.log(colors.red)
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
        await message.createMessage({ embeds: [embed] })
        return;
      }

      // Get the user to be banned
      const user = message?.mentions?.users[0];
      if (!user) {
        const embed = {
          "title": `False Command Usage!`,
          "description": `To execute this command, a **user** must be mentioned.`,
          "color": 0xFF3131,
          "footer": {
            "text": "Please try again."
          },
        }
        await message.createMessage({ embeds: [embed] })
        return;
      }

      // Get the reason for the ban
      const reason = args.slice(1).join(' ') || 'No reason provided';

      try {
        // Ban the user
        await message.guild.createBan(message.guildID, user.id, 0, reason);

        // Send a message to the channel
        const embed = {
          "title": `Success!`,
          "description": `${user.username} has been banned! \nReason: ${reason}`,
          "color": 0x39FF14,
        }
        await message.createMessage({ embeds: [embed] })      } catch (error) {
        console.error(error);
      }
    }
  };