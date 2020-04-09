const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Prefix extends Command {
    constructor(client) {
        super(client, {
            name: "prefix",
            category: 3
        });
    }

    run(message, [prefix]) {
        if (prefix && message.member.hasPermission(["MANAGE_GUILD"])) {
            this.guild.prefix = prefix;
            this.guild.save();
            message.channel.send(new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(this.lang.get("prefixChanged", prefix))
                .setColor(0x66ff66)
                .setTimestamp());
        } else
            message.channel.send(new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`${this.lang.get("prefix", this.guild.prefix)}\n\n${message.member.hasPermission(["MANAGE_GUILD"]) ? this.lang.get("prefixChange", this.guild.prefix) : ""}`)
                .setColor(0x6666ff)
                .setTimestamp());
    }
}