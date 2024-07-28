const config = require(`../config/config.json`)
const p = require("primebit.js")

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        const member = await message.member;
        const guild = client.guilds.get(message.guildID)

        if (member.bot == true) return;

        let prefix = config.prefix
        if (!prefix) {
            const errorEmbed = {
                "title": "Error 102 - Prefix not found",
                "description": "The developer did a fucky wucky. Please contact the developer to fix this issue.",
                "color": 0xFF0000
            };
            await message.createMessage({ embeds: [errorEmbed] });
            return;
        }

        try {
            const rawMessage = message.content;
            const args = rawMessage.split(" ");

            if (!rawMessage.startsWith(prefix)) return;
            if (rawMessage.startsWith(`![](`)) return;

            const commandName = args[0].replace(prefix, "");

            if (!client.commands.get(commandName)) {
                const embed = {
                    "title": `Error!`,
                    "description": `This command does not exist.`,
                    "color": 0xFF3131,
                    "fields": [
                        { "name": `Fix`, "value": `Please ensure you type the command in correctly, if this doesn't fix the error, Please contact the developer.`}
                    ]
                }
                await message.createMessage({ embeds: [embed] })
                return;
            }

            // Log the command execution
            p.log(`${member.username} just ran the command "${commandName}" in "${guild.name}".`);

            await client.commands.get(commandName).execute(message, args, client);
        } catch (error) {
            console.error(error);
            const errorEmbed = {
                "title": "Unexpected Error!",
                "description": `An unexpected error occurred while processing your command. \n\n\`\`\`${error}\`\`\``,
                "color": 0xFF3131,
                "footer": {
                    "text": "Please try again later or contact the developer."
                },
            };
            await message.createMessage({ embeds: [errorEmbed] });
        }
    }
}