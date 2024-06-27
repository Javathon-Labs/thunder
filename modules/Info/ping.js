module.exports ={
    name: `ping`,
    description: `standard ping command`,
    usage: ``,
    async execute(message, args, client) {
        console.log(message)
        await message.createMessage({content: `pong!`, replyMessageIds: [message.id]})
        
    }

}
