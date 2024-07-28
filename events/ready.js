const p = require("primebit.js");
const mongoose = require(`mongoose`);
const { mongoURI } = require(`../config/config.json`);

module.exports = {
    name: `ready`,
    async execute(client) {
        p.log(`Logged in as ${client.user.username}!`);
        p.success(`Registered ${client.commands.size} commands.`);

        if (!mongoURI) return;
        mongoose.connect(mongoURI)
            .then(() => {
                console.log(`This client is now connected to the database`);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};