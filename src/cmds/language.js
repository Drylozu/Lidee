const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Language extends Command {
    constructor(client) {
        super(client, {
            name: "language",
            aliases: ["lang"],
            category: 4,
            botPermissions: ["EMBED_LINKS"]
        });
    }

    run(message, [language]) {

        if (language && this.client.languages.exists(language) && message.member.hasPermission(["MANAGE_GUILD"])) {
            this.guild.language = language;
            this.guild.save();
            message.channel.send(new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(this.lang.get("languageChanged", this.client.languages.get(language).nativeName))
                .setColor(0x66ff66)
                .setTimestamp());
        } else if(message.member.hasPermission(["MANAGE_GUILD"])) {
            message.channel.send(new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**${this.lang.get("languageSupport")}**:\n${this.client.languages.getAll().map((l) => `• ${l.flag} **${l.nativeName.firstUpperCase()}** (${l.displayName.firstUpperCase()} - \`${l.languageCode}\`)`).join("\n")}\n${this.lang.get("languageChange", this.guild.prefix)}`)
                .setColor(0x6666ff)
                .setTimestamp());
        } else {
            message.channel.send(new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`${this.lang.get("language", this.lang.nativeName)}**${this.lang.get("languageSupport")}**:\n${this.client.languages.getAll().map((l) => `• ${l.flag} **${l.nativeName.firstUpperCase()}** (${l.displayName.firstUpperCase()} - \`${l.languageCode}\`)`).join("\n")}`)
                .setColor(0x6666ff)
                .setTimestamp());
        }
    }
}