const axios = require("axios");

module.exports = {
    name: "neko",
    description: "Generates a random neko image.",
    async execute(message, client) {
        try {
            const response = await axios.get("https://api.waifu.pics/sfw/neko");

            const image = response.data.url;

            const embed = {
                title: ":frame_with_picture: Click here to view in HD",
                image: {
                    url: image,
                },
                url: image, // Set the URL of the embed to the image URL
            };

            await message.createMessage({ embeds: [embed], isSilent: true });
        } catch (error) {
            console.error(error);
            return message.createMessage({ content: "An error occurred while generating your image.", isSilent: true });
        }
    },
};