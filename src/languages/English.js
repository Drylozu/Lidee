const Language = require("../structures/Language.js");

module.exports = class English extends Language {
    constructor() {
        this.displayName = "english";
        this.nativeName = "english";
        this.languageCode = "en";

        super({
            // Global
            userNo: `You need to mention an user or provide his ID.`,
            // Ban Command
            banNo: `I don't able to ban that member.`,
            ban: (member) => `The member **${member}** has been banned from the server.`,
            banError: `An error ocurred while banning the member.`,
            // Clear Command
            clearNumber: `You must specify how many messages will be deleted.`,
            clearLimit: `You must specify a number between 1 and 100.`,
            clear: (number) => `${number} messages have been deleted.`,
            clearError: `An error ocurred while deleting messages.`,
            // Kick Command
            kickNo: `I don't able to kick that member.`,
            kick: (member) => `The member **${member}** has been kicked from the server.`,
            kickError: `An error ocurred while kicking the member.`,
            // Mute Command
            muteNo: `That member is already muted!`,
            mute: (member) => `The member **${member}** has been muted from the server.`,
            // Unmute Command
            unmuteNo: `That member is not muted!`,
            unmute: (member) => `The member **${member}** has been unmuted from the server.`
        }, {}, {
            // Help Command
            titleHelp: `Help`,
            descriptionHelp: (name) => `Hello, I'm ${name}.\n\nI'm a useful bot.`,
            titleModeration: `Moderation Commands`,
            descriptionModeration: (count, commands) => `In this category are \`${count}\` command, these are:\n\n${commands}`,
            titlePrototype: `Prototype Commands`,
            descriptionPrototype: (count, commands) => `**Note**: these commands are in development, may contain errors.\n\nIn this category are \`${count}\` command, these are:\n\n${commands}`
            // Commands
        });
    }
}