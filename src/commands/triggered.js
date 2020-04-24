const { MessageAttachment } = require("discord.js");
const Command = require("../structures/Command");

module.exports = class Triggered extends Command {
    constructor(client) {
        super(client, {
            name: "triggered",
            aliases: ["tg"],
            category: 3,
            botPermissions: ["channel", "ATTACH_FILES"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first() || (args.join(" ").length > 2 ? message.guild.members.cache.find((m) => m.user.tag.toLowerCase().includes(args.join(" ").toLowerCase())) : null) || message.member;
        let attachment = message.attachments.first() &&
            [".png", ".gif", ".jpg"].some((e) => message.attachments.first().url.endsWith(e))
            ? message.attachments.first().url : member.user.displayAvatarURL({ format: "png", size: 256 });
        let triggered = await this.client.apis.weez.getTriggered(attachment);
        message.channel.send(new MessageAttachment(triggered, "triggered.gif"));
    }
}