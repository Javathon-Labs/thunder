const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'help',
  description: 'Shows all available commands.',
  usage: '.help',
  async execute(message, args, client) {
    const commandsPath = path.join(__dirname, '..');
    const commandFolders = fs.readdirSync(commandsPath);

    const fields = commandFolders.map(folder => {
      const folderPath = path.join(commandsPath, folder);
      const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
      const commands = commandFiles.map(file => path.parse(file).name);

      return {
        name: folder.charAt(0).toUpperCase() + folder.slice(1),
        value: commands.map(cmd => `\`${cmd}\``).join(', ') || 'No commands'
      };
    });

    const embed = {
      title: `Welcome to the Help Menu!`,
      description: `Prefix is \`$\` \n**${client.commands.size}** commands!`,
      fields: fields
    };

    await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
  }
};