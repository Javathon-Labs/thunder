module.exports = {
    name: `userinfo`,
    description: `Get information on a user.`,
    usage: ``,
    async execute(message, args, client) {

        const embed = {
            "title": `${message.member.username} [\`${message.member.id}\`]`,
            "thumbnail": {
             "url": `${message.member.avatarURL}`
            },
            "fields": [
                { "name": `Account Creation`, "value": `${message.member.createdAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`},
                { "name": `Server Joined`, "value": `${message.member.joinedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`},
                { "name": `isOwner`, "value": `${message.member.isOwner}`}
            ]
        }
        await message.createMessage({ embeds: [embed] })
    }
}