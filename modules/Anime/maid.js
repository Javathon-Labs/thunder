const axios = require("axios");

module.exports = {
    name: "maid",
    description: "Generates a random maid image.",
    aliases: ["maid"],
    async execute(message, client) {
        try {
            const response = await axios.get("https://api.waifu.im/search?included_tags=maid&height=>=2000");

            const image = response.data.images[0].url;

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