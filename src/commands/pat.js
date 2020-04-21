const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Pat extends Command {
    constructor(client) {
        super(client, {
            name: "pat",
            category: 3,
            botPermissions: ["channel", "EMBED_LINKS"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first() || message.guild.members.cache.find((m) => m.user.tag.includes(args.join(" ")));
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);
        if (member.user.bot) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("patBot")}`);
        let image = await this.client.apis.nekosLife.getPatImage();
        message.channel.send(new MessageEmbed()
            .setDescription(this.lang.get("pat", message.member.displayName, member.displayName))
            .setImage(image)
            .setColor(0x6666ff)
            .setTimestamp());
    }
}