const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Premium extends Command {
    constructor(client) {
        super(client, {
            name: "premium",
            category: 4,
            botPermissions: ["EMBED_LINKS"]
        });
    }

    async run(message, [key]) {
        if (!key || this.guild.premium)
            message.channel.send(new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`${this.guild.premium ? this.lang.getEmoji("serverPremium") : ""} ${this.lang.get(`premium${this.guild.premium ? "Yes" : "No"}`, this.guild.prefix)}`)
                .setColor(this.guild.premium ? 0xffff66 : 0x6666ff)
                .setTimestamp());
        else {
            let keyInfo = await this.client.keys.get(key);
            if (!keyInfo || (Date.now() - keyInfo.expiredAt) < 0 || keyInfo.usedBy)
                message.channel.send(new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`${this.lang.getEmoji("error")} ${this.lang.get("premiumInvalid")}`)
                    .setColor(0xff6666)
                    .setTimestamp());
            else {
                this.guild.premium = true;
                keyInfo.usedBy = message.author.id;
                keyInfo.usedAt = Date.now();
                this.guild.save();
                keyInfo.save();
                message.channel.send(new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`${this.lang.getEmoji("serverPremium")} ${this.lang.get("premium")}`)
                    .setColor(0xff6666)
                    .setTimestamp());
            }
        }
    }
}