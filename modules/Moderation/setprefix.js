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
      throw new Error('Missing Permissions: To use this command, you need the "Manage Server" permission!');
    }

    // Get the new prefix from the command arguments
    const newPrefix = args[1]; // Access the second argument
    if (!newPrefix) {
      throw new Error('Please provide a new prefix. Usage: "$setprefix (prefix)"');
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
        color: 0x39FF14,
      };
      await message.createMessage({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to update server prefix: ${error.message}`);
    }
  }
};