const colors = require('../../config/config.json').colors;
// commands/setprefix.js
const ServerSettings = require('../../Schemas/SettingsSchema');

module.exports = {
  name: 'setprefix',
  description: 'Changes the server prefix.',
  usage: '$setprefix (prefix)',
  async execute(message, args, client) {
    // Check if the user has the necessary permissions
    const permissionCheck = await message.member.getPermission();
    if (!permissionCheck.includes('ManageServer') && !message.member.isOwner) {
      const embed = {
        title: 'Missing Permissions!',
        description: 'To use this command, you need the `Manage Server` permission!',
        color: colors.red,
        footer: {
            text: 'Please try again later.'
        }
    };
    return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
}

    // Get the new prefix from the command arguments
    const newPrefix = args[1]; // Access the second argument
    if (!newPrefix) {
      const embed = {
        title: 'Missing Arguments!',
        description: "**You are missing arguments!**",
        fields: [
            {
                name: 'Error',
                value: 'a `prefix` is a required argument that was missing.',
            },
        ],
        color: colors.red,
    };
    return message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isPrivate: true });
}

    try {
      // Update the server settings in the database
      const serverSettings = await ServerSettings.findOneAndUpdate(
        { serverId: message.guildID },
        { prefix: newPrefix },
        { new: true, upsert: true }
      );

      // Send a success message to the channel
      const embed = {
        title: 'Success!',
        description: `The server prefix has been updated to \`${serverSettings.prefix}\``,
        color: colors.green,
      };
      await message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isSilent: true });
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to update server prefix: ${error.message}`);
    }
  }
};