const colors = require('../../config/config.json').colors;

module.exports = {
    name: 'unban',
    description: 'Unbans a user from the server.',
    usage: '$unban <userid>',
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

        // Get the user ID to be unbanned
        const userId = args[1];
        if (!userId) {
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
            // Unban the user
            await client.removeBan(message.guildID, userId);

            // Send a success message to the channel
            const embed = {
                "title": `Success!`,
                "description": `User with ID \`${userId}\` has been unbanned!`,
                "color": colors.green,
            }
            await message.createMessage({ embeds: [embed], replyMessageIds: [message.id], isSilent: true });
        } catch (error) {
            console.error(error);
            throw new Error(`Failed to unban the user: ${error.message}`);
        }
    }
}