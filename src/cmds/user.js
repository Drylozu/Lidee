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
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first() || message.member;

        let embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`> <@${member.id}> ${member.user.bot ? this.lang.getEmoji("userBot") : ""}${message.guild.owner.id === member.id ? this.lang.getEmoji("userOwner") : ""}${member.user.presence.clientStatus && member.user.presence.clientStatus.mobile ? this.lang.getEmoji("statusMobile")[member.user.presence.clientStatus.mobile] : this.lang.getEmoji("status")[member.user.presence.status]}${member.premiumSince ? this.lang.getEmoji("userBooster") : ""}${member.voice.channel ? this.lang.getEmoji("voiceChannel") : ""}`)
            .addField(this.lang.get("userJoined"), this.lang.parseCompleteDate(member.joinedAt), true)
            .addField(this.lang.get("userCreated"), this.lang.parseCompleteDate(member.user.createdAt), true)
            .addField(this.lang.get("userPermissions"), this.lang.parsePermissions(member.permissions.toArray()));
        if (member.user.presence.activities.length > 0)
            embed.addField(this.lang.get("userActivity"), this.lang.parseMemberActivity(member.user.presence.activities), member.premiumSince instanceof Date);
        if (member.premiumSince)
            embed.addField(this.lang.get("userBoosting"), this.lang.parseCompleteDate(member.premiumSince), embed.fields.length === 4);
        embed.addField(this.lang.get("roles", member.roles.cache.filter((r) => r.id !== r.guild.roles.everyone.id).size), this.lang.parseMemberRoles(member.roles))
            .setColor(member.displayHexColor)
            .setFooter(this.lang.get("id", member.id))
            .setTimestamp();

        message.channel.send(embed);
    }
}