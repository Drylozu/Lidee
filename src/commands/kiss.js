const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Kiss extends Command {
    constructor(client) {
        super(client, {
            name: "kiss",
            category: 3,
            botPermissions: ["channel", "EMBED_LINKS"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first() || (args.join(" ").length > 2 ? message.guild.members.cache.sort((a, b) => b.user.tag - a.user.tag).find((m) => m.user.tag.toLowerCase().includes(args.join(" ").toLowerCase())) : null);
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);
        if (member.user.bot) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("kissBot")}`);
        let image = await this.client.apis.nekosLife.getKissImage();
        message.channel.send(new MessageEmbed()
            .setDescription(this.lang.get("kiss", message.member.displayName, member.displayName))
            .setImage(image)
            .setColor(0x6666ff)
            .setTimestamp());
    }
}