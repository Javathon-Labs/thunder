const { Client } = require('touchguild');
const fs = require('fs');
const config = require('./config/config.json');
const client = new Client({ token: config.token });
const BadWord = require('./Schemas/BadWordSchema');
const mongoose = require('mongoose');

const handlerFiles = fs.readdirSync('./handlers/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./modules');

client.on('ready', () => {

});

client.on('messageCreate', async (message) => {
  const serverId = message.guildID;
  const content = message.content.toLowerCase();

  try {
    const badWords = await BadWord.find({ serverId });

    for (const badWord of badWords) {
      if (content.includes(badWord.word)) {
        try {
          await message.delete();
        } catch (error) {
          console.error('Error deleting message:', error);
        }
        break;
      }
    }
  } catch (error) {
    console.error('Error checking for bad words:', error);
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