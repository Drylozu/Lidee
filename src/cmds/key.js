const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Key extends Command {
    constructor(client) {
        super(client, {
            name: "key",
            ownerOnly: true,
            botPermissions: ["EMBED_LINKS"]
        });
    }

    async run(message, args) {
        /* eslint-disable no-underscore-dangle */
        if (!args[0]) return message.channel.send("You must put an option.\nUsage: `key [Key]`, `key [key] expire`, `key list`, `key create [expires]`.");
        if (args[0] === "list") {
            let keys = await this.client.keys.getAll();
            message.channel.send(keys.map((k) => `${(Date.now() - k.expiresAt) > 0 || k.usedBy ? this.lang.getEmoji("error") : this.lang.getEmoji("okay")} ${k._id}`).join(", "));
        } else if (args[0] === "create") {
            let keyInfo = this.client.keys.create({
                createdBy: message.author.id,
                expiresAt: args[1] ? parseInt(args[1]) + Date.now() : null
            });
            message.channel.send(new MessageEmbed()
                .setDescription(`Key ID **${keyInfo._id}**`)
                .addField("Created by", `<@${keyInfo.createdBy}>`)
                .addField("Created at", this.lang.parseCompleteDate(new Date(keyInfo.createdAt)))
                .addField("Used by", keyInfo.usedBy ? `<@${keyInfo.usedBy}>` : "No used")
                .addField("Used at", keyInfo.usedBy ? this.lang.parseCompleteDate(new Date(keyInfo.usedAt)) : "No used")
                .addField("Expires at", this.lang.parseCompleteDate(new Date(keyInfo.expiresAt)))
                .setColor(0x6666ff)
                .setTimestamp());
        } else {
            let keyInfo = await this.client.keys.get(args[0].toLowerCase());
            if (!keyInfo)
                message.channel.send("Invalid key");
            else if (keyInfo && args[1] === "expire") {
                keyInfo.expiresAt = Date.now();
                keyInfo.save();
                message.channel.send("Ready");
            } else message.channel.send(new MessageEmbed()
                .setDescription(`Key ID **${keyInfo._id}**`)
                .addField("Created by", `<@${keyInfo.createdBy}>`)
                .addField("Created at", this.lang.parseCompleteDate(new Date(keyInfo.createdAt)))
                .addField("Used by", keyInfo.usedBy ? `<@${keyInfo.usedBy}>` : "No used")
                .addField("Used at", keyInfo.usedBy ? this.lang.parseCompleteDate(new Date(keyInfo.usedAt)) : "No used")
                .addField("Expires at", this.lang.parseCompleteDate(new Date(keyInfo.expiresAt)))
                .setColor(0x6666ff)
                .setTimestamp());
        }
    }
}