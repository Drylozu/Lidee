const { Collection } = require("discord.js");
const path = require("path");
const fs = require("fs");

module.exports = class CommandsManager extends Collection {
    constructor(client) {
        super();
        this.client = client;
        this.loadCommands();
    }

    loadCommands() {
        for (let file of fs.readdirSync(path.join(__dirname, "../commands/"))) {
            let command = new (require(`../commands/${file}`))(this.client);
            let existingCommand = this.find((c) => [...command.aliases, command.name, command.constructor.name].some((n) => [...c.aliases, c.name, c.constructor.name].includes(n)));
            if (existingCommand) this.client.log(`Commands with equal names or aliases found (${file} and ${existingCommand.name})`, true);
            this.set(command.name, command);
        }
    }
}