const Command = require("../structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Prefix extends Command {
    constructor(client) {
        super(client, {
            name: "prefix",
            category: 6
        });
    }

    async run(message, args) {

        if (!message.member.hasPermission(["MANAGE_GUILD"])) {
            message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(this.lang.get("prefixUser", this.guild.prefix))
                .setColor(0xff6666))
        } else {
            if (!args[0]) {
                message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(this.lang.get("prefixAdmin", this.guild.prefix))
                .setColor(0xff6666))
            } else {
                message.channel.send(this.lang.get("prefixChanged", args[0]))
                this.guild.prefix = args[0];
                this.guild.save();
            }
        }
    }
}