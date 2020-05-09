const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Avatar extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            aliases: ["av", "useravatar"],
            category: 2
        });
    }

    run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first() || (args.join(" ").length > 2 ? message.guild.members.cache.sort((a, b) => a.user.tag.localeCompare(b.user.tag)).find((r) => r.user.tag.toLowerCase().includes(args.join(" ").toLowerCase())) : null) || message.member;
        let avatar = member.user.displayAvatarURL({ size: 512, format: "png", dynamic: true });

        message.channel.send(new MessageEmbed()
            .setAuthor(member.user.tag, message.author.displayAvatarURL())
            .setDescription(`[${this.lang.get("imageUrl")}](${avatar})`)
            .setImage(avatar)
            .setColor(0x6666ff)
            .setTimestamp());
    }
}