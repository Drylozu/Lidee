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
        let member = args[0] ? message.guild.members.cache.find((m) => [m.displayName.toLowerCase(), m.user.tag.toLowerCase(), m.user.username.toLowerCase(), m.user.discriminator].includes(args[0].toLowerCase())) : (message.mentions.members.first() || message.member);

        let embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`> <@${member.id}> ${member.user.bot ? this.lang.getEmoji("userBot") : ""}${message.guild.ownerID === member.id ? this.lang.getEmoji("userOwner") : ""}${member.premiumSince ? this.lang.getEmoji("userBooster") : ""}${member.user.presence.clientStatus && member.user.presence.clientStatus.mobile ? this.lang.getEmoji("statusMobile")[member.user.presence.clientStatus.mobile] : this.lang.getEmoji("status")[member.user.presence.status]}`)
            .addField(this.lang.get("userJoined"), this.lang.parseMiliseconds(Date.now() - member.joinedAt), true)
            .addField(this.lang.get("userCreated"), this.lang.parseMiliseconds(Date.now() - member.user.createdAt), true)
            .addField(this.lang.get("userPermissions"), this.lang.parsePermissions(member.permissions.toArray()))
            .addField(this.lang.get("userRoles"), member.roles.cache.filter((r) => r.id != '633379996999876658').sort((a, b) => b.position - a.position).map((r) => member.roles.hoist === r ? `__<@&${r.id}>__` : `<@&${r.id}>`).join(", "), true)
            .setColor(member.displayHexColor)
            .setFooter(`ID: ${member.id}`);

        message.channel.send(embed);
    }
}