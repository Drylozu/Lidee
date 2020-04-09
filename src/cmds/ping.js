const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            category: 1
        });
    }

    run(message) {
        message.channel.send(new MessageEmbed()
            .setDescription(this.lang.get("pingCalculating"))
            .setColor(0x66ff66)
            .setTimestamp())
            .then((msg) => {
                let ping = Math.abs((new Date() - msg.createdAt));
                let color = 0xff6666;
                if (ping <= 650)
                    color = 0xffff66;
                if (ping <= 150)
                    color = 0x66ff66;
                msg.edit(new MessageEmbed(msg.embeds[0])
                    .setDescription(this.lang.get("ping", ping))
                    .setColor(color));
            });
    }
}