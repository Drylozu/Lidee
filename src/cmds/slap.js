const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Slap extends Command {
    constructor(client) {
        super(client, {
            name: "slap",
            aliases: ["hit"],
            category: 3,
            botPermissions: ["EMBED_LINKS"]
        });
    }

    async run(message, [id]) {
        let member = message.guild.members.resolve(id) || message.mentions.members.first();
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);
        if (member.user.bot) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("slapBot")}`);
        let image = await this.client.nekosLife.sfw.slap();
        message.channel.send(new MessageEmbed()
            .setDescription(this.lang.get("slap", message.member.displayName, member.displayName))
            .setImage(image.url)
            .setColor(0x6666ff)
            .setTimestamp());
    }
}