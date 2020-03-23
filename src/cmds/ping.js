const Command = require("../structures/Command.js");

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            category: 1
        });
    }

    run(message) {
        message.channel.send(`Pong! ${this.client.ws.ping}ms.`);
    }
}