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
            let helpStrings = this.client.languages.getAll().map((l) => [l.getHelp(`${command.name}Usage`), l.getHelp(`${command.name}Description`)]).flat();
            if (helpStrings.some((s) => !s) && !command.ownerOnly) this.client.log(`Cannot find usage/description of the command ${command.name}`, true);
            this.set(command.name, command);
        }
    }
}