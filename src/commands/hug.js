const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Hug extends Command {
    constructor(client) {
        super(client, {
            name: "hug",
            category: 3,
            botPermissions: ["channel", "EMBED_LINKS"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first() || (args.join(" ").length > 2 ? message.guild.members.cache.sort((a, b) => a.user.tag.localeCompare(b.user.tag)).find((m) => m.user.tag.toLowerCase().includes(args.join(" ").toLowerCase())) : null);
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);
        if (member.user.bot) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("hugBot")}`);
        let image = await this.client.apis.nekosLife.getHugImage();
        message.channel.send(new MessageEmbed()
            .setDescription(this.lang.get("hug", message.member.displayName, member.displayName))
            .setImage(image)
            .setColor(0x6666ff)
            .setTimestamp());
    }
}