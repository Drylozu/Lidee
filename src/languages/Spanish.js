const Language = require("../structures/Language.js");

module.exports = class Spanish extends Language {
    constructor() {
        super({
            // Help Command
            help: "Hello, I'm Tryxer.\n\nI'm a useful bot.",
            helpModeration: (count, commands) => `In this category are \`${count}\` command, these are:\n\n${commands}`,
            helpPrototype: (count, commands) => `**Note**: these commands are in development, may contain errors.\n\nIn this category are \`${count}\` command, these are:\n\n${commands}`
        }, {
            
        });
    }
}