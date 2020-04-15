const Command = require("../structures/Command");

module.exports = class Say extends Command {
    constructor(client) {
        super(client, {
            name: "say",
            category: 2
        });
    }

    run(message, args) {
        if (args.join(" ").length < 1) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("sayNo")}`);
        message.channel.send(args.join(" "), {
            disableMentions: message.channel.permissionsFor(message.member).has("MENTION_EVERYONE") ? "none" : "everyone"
        });
    }
}