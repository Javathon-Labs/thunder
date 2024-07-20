const { anime_api_url } = require('../../config/config.json');

module.exports = {
  name: 'find',
  description: 'Get information about an anime or manga.',
  usage: '.find [anime/manga] <name>',
  async execute(message, args, client) {
    // Check if the user provided an anime or manga name
    if (args.length < 2 || (args[1] !== 'anime' && args[1] !== 'manga')) {
      const embed = {
        title: `Error!`,
        description: `To execute this command, you must specify whether you're searching for an anime or manga, followed by the name.`,
        color: 0xFF3131,
        fields: [
          {
            name: "Usage",
            value: `\`\`\`.find [anime/manga] [name]\`\`\``,
          },
        ],
      };
      await message.createMessage({ embeds: [embed] });
      return;
    }

    const searchType = args[1];
    const searchName = args.slice(2).join(' ');

    try {
      // Construct the API URL with the provided anime or manga name
      const apiUrl = `${anime_api_url}/${searchType}?q=${encodeURIComponent(searchName)}`;

      // Fetch the data from the API
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Check if the API response contains any results
      if (data.data.length === 0) {
        const embed = {
          title: 'Error!',
          description: `No ${searchType} found for \`${searchName}\`!`,
          color: 0xFF3131,
        };
        await message.createMessage({ embeds: [embed] });
        return;
      }

      // Extract the relevant information based on the search type
      const result = data.data[0];
      let title, type, status, synopsis, imageUrl, malId, rating;
      if (searchType === 'anime') {
        title = result.title;
        type = result.type;
        status = result.status;
        synopsis = result.synopsis;
        imageUrl = result.images.jpg.image_url;
        malId = result.mal_id;
        rating = result.rating;
      } else {
        title = result.title;
        type = result.type;
        status = result.status;
        synopsis = result.synopsis;
        imageUrl = result.images.jpg.image_url;
        malId = result.mal_id;
        rating = result.score;
      }

      // Create an embed with the result information
      const embed = {
        title: title,
        description: synopsis,
        url: `https://myanimelist.net/${searchType}/${malId}`,
        thumbnail: {
          url: imageUrl,
        },
        fields: [
          {
            name: 'Details',
            value: `\`\`\`Type: ${type} \nStatus: ${status} \nRating: ${rating}\`\`\``,
          },
        ],
        color: 0x3498DB,
      };

      // Send the embed to the channel
      await message.createMessage({ embeds: [embed], replyMessageIds: [message.id] });
    } catch (error) {
      console.error(error);
      const embed = {
        title: 'Error!',
        description: `An error occurred while executing this command. /n/n \`${error}\``,
        color: 0xFF3131,
      };
      await message.createMessage({ embeds: [embed] });
    }
  },
};