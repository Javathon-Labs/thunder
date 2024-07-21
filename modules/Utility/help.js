module.exports = {
    name: 'help',
    description: 'Shows all availible commands.',
    usage: '.help',
    async execute(message, args, client) {
        const embed = {
          title: `Welcome to the Help Menu!`,
          description: `Prefix is \`.\` \n**${client.commands.size}** commands!`,
          fields: [
            {
                name: "General",
                value: `\`help\``,
            },
            {
                name: "Moderation",
                value: `\`ban\`, \`kick\``,
            },
            {
                name: 'Anime',
                value: `\`find\``
            }
        ],
          color: 0xFFFFFF,
      }
        await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
      }
}