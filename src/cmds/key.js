const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Key extends Command {
    constructor(client) {
        super(client, {
            name: "key",
            ownerOnly: true
        });
    }

    run(message, args) {
        if (!args[0]) return message.channel.send("Usage: `key [Key]`, `key [key] expire`, `key create [expires]`");
        if (args[0] === "list")
            this.client.db.keys.find().exec()
                .then((keys) => {
                    // eslint-disable-next-line
                    message.channel.send(keys.map((k) => `${(Date.now() - k.expiresAt) >  0 || k.usedBy ? this.lang.getEmoji("error") : this.lang.getEmoji("okay")} ${k._id}`).join(", "));
                });
        else if (args[0] === "create") {
            let keyCode = Math.random().toString(16).slice(2).toUpperCase();
            let keyMSExpires = parseInt(args[1]);
            let key = new this.client.db.keys({
                _id: keyCode.toLowerCase(),
                createdBy: message.author.id,
                createdAt: Date.now(),
                expiresAt: keyMSExpires ? Date.now() + keyMSExpires : null
            });
            key.save();
            message.channel.send(`Key ID ${keyCode}`);
        } else
            this.client.db.keys.findOne({ _id: args[0].toLowerCase() }).exec()
                .then((keyInfo) => {
                    if (!keyInfo)
                        message.channel.send("Invalid key");
                    else if (keyInfo && args[1] === "expire") {
                        keyInfo.expiresAt = Date.now();
                        keyInfo.save();
                        message.channel.send("Ready");
                    } else
                        message.channel.send(new MessageEmbed()
                            // eslint-disable-next-line
                            .setDescription(`Key ID **${keyInfo._id}**`)
                            .addField("Created by", `<@${keyInfo.createdBy}>`)
                            .addField("Created at", this.lang.parseCompleteDate(new Date(keyInfo.createdAt)))
                            .addField("Used by", keyInfo.usedBy ? `<@${keyInfo.usedBy}>` : "No used")
                            .addField("Used at", keyInfo.usedBy ? this.lang.parseCompleteDate(new Date(keyInfo.usedAt)) : "No used")
                            .addField("Expires at", this.lang.parseCompleteDate(new Date(keyInfo.expiresAt)))
                            .setColor(0x6666ff)
                            .setTimestamp());
                });
    }
}