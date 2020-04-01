const Command = require("../structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Server extends Command {
    constructor(client) {
        super(client, {
            name: "server",
            aliases: ["serverinfo", "si", "s"],
            category: 1
        });
    }

    run(message, args) {

        let embed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`> <@${message.guild.ownerID}> ${message.guild.ownerID === message.author.id ? this.lang.getEmoji("userOwner") : ""}`)
            .addField(this.lang.get("guildCreated"), this.lang.parseMiliseconds(Date.now() - message.guild.createdAt), true)
            .addField(this.lang.get("guildRoles"), message.guild.roles.cache.filter((r) => r.id != "633379996999876658").sort((a, b) => b.position - a.position).map((r) => `<@&${r.id}>`).join(", "), true)
            .addField(this.lang.get("afkChannel"), message.guild.afkChannelID ? `<#${message.guild.afkChannelID}` : 'Not Defined', true)
            .addField(this.lang.get("Emojis"), message.guild.emojis.cache.map((emoji) => `<${emoji.name}:${emoji.id}>`).join(" "))
            .setColor('0xFFFFFF')
            .setFooter(`ID: ${message.guild.id}`);

        message.channel.send(embed);
    }
}