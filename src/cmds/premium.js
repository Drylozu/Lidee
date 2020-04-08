const Command = require("../structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Premium extends Command {
    constructor(client) {
        super(client, {
            name: "premium",
            category: 6
        });
    }

    async run(message, args) {
        if (!this.guild.premium) {
            let embed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(this.lang.get("noPremium", this.guild.prefix))
                .setColor(0xff6666)

            return message.channel.send(embed)
        }
    }
}