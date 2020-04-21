const { MessageAttachment } = require("discord.js");
const Command = require("../structures/Command");

module.exports = class Trump extends Command {
    constructor(client) {
        super(client, {
            name: "trump",
            category: 3,
            botPermissions: ["channel", "ATTACH_FILES"]
        });
    }

    async run(message, args) {
        if (args.join(" ").length < 1) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("trumpNo")}`);
        let trump = await this.client.apis.weez.getTrump(args.join(" "));
        message.channel.send(new MessageAttachment(trump, "trump.png"));
    }
}