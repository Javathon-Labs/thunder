
//don't touch

const config = require(`../config/config.json`)

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        const member = await message.member;
        if (member.bot == true) return;

        let prefix = config.prefix
        if (!prefix) {
            await message.createMessage(`The developer did a fucky wucky.`)
        } else {
            const rawMessage = message.content;
            const args = rawMessage.split(" ");

            if (!rawMessage.startsWith(prefix)) return;
            if (rawMessage.startsWith(`![](`)) return;

            const commandName = args[0].replace(prefix, "");

            if (!client.commands.get(commandName)) {

                const embed = {
                    "title": `There was an issue!`,
                    "description": `Error 101 - Command not found!`,
                    "fields": [
                        { "name": `Fix`, "value": `> Ensure you type the command in correctly, if this doesn't fix the error.`}
                    ]
                    
                }
                await message.createMessage({ embeds: [embed] })
                return;
            }
            client.commands.get(commandName).execute(message, args, client);
        }
    }
}
