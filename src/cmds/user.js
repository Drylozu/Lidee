const Command = require("../structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class User extends Command {
    constructor(client) {
        super(client, {
            name: "user",
            aliases: ["userinfo", "ui", "u"],
            category: 1
        });
    }

    run(message, args) {
        let member = message.guild.members.cache.array().find(name => name.user.username.toLowerCase() == args[0].toLowerCase() || name.user.discriminator == args[0].replace('#', '') || name.displayName.toLowerCase() == args[0].toLowerCase()) || message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;

        let embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`> <@${member.id}> ${member.user.bot ? this.lang.getEmoji("userBot") : ""}${message.guild.ownerID === member.id ? this.lang.getEmoji("userOwner") : ""}${member.premiumSince ? this.lang.getEmoji("userBooster") : ""}${member.user.presence.clientStatus && member.user.presence.clientStatus.mobile ? this.lang.getEmoji("statusMobile")[member.user.presence.clientStatus.mobile] : this.lang.getEmoji("status")[member.user.presence.status]}`)
            .addField(this.lang.get("userJoined"), this.lang.parseMS(Date.now() - member.joinedAt), true)
            .addField(this.lang.get("userCreated"), this.lang.parseMS(Date.now() - member.user.createdAt), true)
            .addField(this.lang.get("userPermissions"), this.lang.parsePermissions(member.permissions.toArray()))
            .addField(this.lang.get("userRoles"), member.roles.cache.filter((r) => message.guild.roles.everyone === r).sort((a, b) => b.position - a.position).map((r) => member.roles.hoist === r ? `__<@&${r.id}>__` : `<@&${r.id}>`).join(", "), true)
            .setColor(member.displayHexColor)
            .setFooter(`ID: ${member.id}`);

        message.channel.send(embed);
    }
}