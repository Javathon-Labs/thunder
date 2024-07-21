const { Client } = require('touchguild');
const fs = require('fs');
const config = require('./config/config.json');
const client = new Client({ token: config.token });

const handlerFiles = fs.readdirSync('./handlers/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./modules');

client.on('ready', () => {

});

client.updateUserStatus('d8qQLWGm', {
    content: 'Kira | prefix is =',
    emoteId: 2460721
  });

client.on('messageCreate', async (message) => {
  if (await message.member.bot) return;
  if (message.mentions?.users?.find((user) => user.id === client.user?.id)) {
    const embed = {
        title: `That's Me!`,
        description: `Hi <@${message.memberID}>, My prefix is \`=\`. \nPlease check \`=help\` for more info.`,
        color: 0xFFFFFF,
        image: {
            url: "https://media1.tenor.com/m/vNapCUP0d3oAAAAC/pjsk-pjsk-anime.gif"
          }
    }
      await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
    } 
});

(async () => {
  for (const file of handlerFiles) {
    require(`./handlers/${file}`)(client);
  }

  client.commands = new Map();
  client.registerEvents(eventFiles, './events');
  client.handleCommands(commandFolders);

  await client.connect(config.token);
})();