const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Server extends Command {
    constructor(client) {
        super(client, {
            name: "server",
            aliases: ["serverinfo", "si", "s"],
            category: 2,
            botPermissions: ["EMBED_LINKS"]
        });
    }

    run(message) {
        let embed = new MessageEmbed()
            .setAuthor(message.guild.nameAcronym, message.guild.iconURL())
            .setDescription(`> **${message.guild.name}** ${this.guild.premium ? this.lang.getEmoji("serverPremium") : ""}${message.guild.verified ? this.lang.getEmoji("serverVerified") : ""}${message.guild.partnered ? this.lang.getEmoji("serverPartner") : ""}${message.guild.premiumSubscriptionCount ? this.lang.getEmoji("serverBoosts")[message.guild.premiumTier] : ""}${message.guild.defaultMessageNotifications === "ALL" ? this.lang.getEmoji("notifyMessages") : this.lang.getEmoji("notifyMentions")}${message.guild.mfaLevel ? this.lang.getEmoji("serverMfa") : ""}${message.guild.vanityURLCode ? `\n**${this.lang.get("serverVanityUrl")}**: ${message.guild.vanityURLCode}` : ""}`)
            .addField(this.lang.get("serverCreated"), this.lang.parseCompleteDate(message.guild.createdAt))
            .addField(this.lang.get("serverOwner"), `${this.lang.getEmoji("userOwner")} <@${message.guild.owner.id}> (${this.lang.get("id", message.guild.owner.id)})`)
            .addField(this.lang.get("serverVerification"), this.lang.getConstant("verificationLevels", message.guild.verificationLevel))
            .addField(this.lang.get("serverExplicitContentFilter"), this.lang.getConstant("explicitContentFilter", message.guild.explicitContentFilter));
        if (message.guild.description)
            embed.addField(this.lang.get("serverDescription"), message.guild.description);
        if (message.guild.features.length > 0)
            embed.addField(this.lang.get("serverFeatures"), this.lang.parseServerFeatures(message.guild.features));
        if (message.guild.emojis.cache.size > 0)
            embed.addField(this.lang.get("serverEmojis"), this.lang.parseServerEmojis(message.guild.emojis));
        embed.addField(this.lang.get("roles", message.guild.roles.cache.filter((r) => r.id !== r.guild.roles.everyone.id).size), this.lang.parseServerRoles(message.guild.roles))
            .setFooter(this.lang.get("id", message.guild.id))
            .setColor(0x6666ff)
            .setTimestamp();

        message.channel.send(embed);
    }
}