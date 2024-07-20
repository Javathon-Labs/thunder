const p = require("primebit.js");

module.exports = {
    name: `ready`,
    async execute(client) {
        p.log(`Logged in as ${client.user.username}!`);
        p.success(`Registered ${client.commands.size} commands.`);
    }
}