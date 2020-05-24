const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Channel extends Command {
    constructor(client) {
        super(client, {
            name: "channel",
            category: 5
        });
    }

    async run(message, args) {
        let Alloweds = []
        let Denieds = []

        message.guild.roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).forEach(role => {
            let permissions = message.channel.permissionsFor(role.id);
            if(!permissions.has("SEND_MESSAGES") || !permissions.has("VIEW_CHANNEL")) {
                if(role == message.guild.id) {
                    Denieds = [];
                    Denieds.push("@everyone");
                    return;
                }
                role.id == message.guild.id ? Denieds.push("@everyone") : Denieds.push(`<@&${role.id}>`)

            } else {
                if(role == message.guild.id) {
                    Alloweds = [];
                    Alloweds.push("@everyone");
                    return;
                }
                role.id == message.guild.id ? Alloweds.push("@everyone") : Alloweds.push(`<@&${role.id}>`)
            }
        })

        message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`${message.channel.parent}\n> **<#${message.channel.id}>** ${message.channel.nsfw ? "(NSFW)" : ""}(ID: ${message.channel.id})`)
            .addField("Canal creado el", this.lang.parseCompleteDate(message.channel.createdAt))
            .addField("Cooldown", this.lang.parseTime(message.channel.rateLimitPerUser * 1000))
            .addField("Tema del canal", `> ${message.channel.topic}`)
            .addField("Roles que pueden ver el canal", Alloweds.join(", "))
            .addField("Roles que no pueden ver el canal", Denieds.join(", "))
            .setColor(0x6666ff))
    }
}