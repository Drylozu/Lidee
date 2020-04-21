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

    run(message, [id]) {
        let member = message.guild.members.resolve(id) || message.mentions.members.first() || message.member;
        let avatar = member.user.displayAvatarURL({ size: 512, format: "png", dynamic: true });

        message.channel.send(new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`[${this.lang.get("avatar")}](${avatar})`)
            .setImage(avatar)
            .setColor(0x6666ff)
            .setTimestamp());
    }
}