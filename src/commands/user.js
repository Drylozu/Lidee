const UserFlags = require("../structures/UserFlags");
const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class User extends Command {
    constructor(client) {
        super(client, {
            name: "user",
            aliases: ["userinfo", "ui", "u"],
            category: 2,
            botPermissions: ["channel", "EMBED_LINKS"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first() || (args.join(" ").length > 2 ? message.guild.members.cache.sort((a, b) => b.user.tag - a.user.tag).find((r) => r.user.tag.toLowerCase().includes(args.join(" ").toLowerCase())) : null) || message.member;
        let user = await this.client.db.users.findOne({ _id: member.id }).exec()
        if (!user)
            user = { flags: 0 };
        let userFlags = new UserFlags(user.flags);

        let embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`> <@${member.id}> ${userFlags.has("DEVELOPER") ? this.lang.getEmoji("userDeveloper") : ""}${userFlags.has("BUG_HUNTER") ? this.lang.getEmoji("userBugHunter") : ""}${userFlags.has("TRANSLATOR") ? this.lang.getEmoji("userTranslator") : ""}${userFlags.has("DONATOR") ? this.lang.getEmoji("userDonator") : ""}${member.user.bot ? this.lang.getEmoji("userBot") : ""}${message.guild.owner.id === member.id ? this.lang.getEmoji("userOwner") : ""}${member.user.presence.clientStatus && member.user.presence.clientStatus.mobile ? this.lang.getEmoji("statusMobile")[member.user.presence.clientStatus.mobile] : this.lang.getEmoji("status")[member.user.presence.status]}${member.premiumSince ? this.lang.getEmoji("userBooster") : ""}${member.voice.channel ? this.lang.getEmoji("voiceChannel") : ""}`)
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