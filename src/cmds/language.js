const Command = require("../structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Language extends Command {
    constructor(client) {
        super(client, {
            name: "language",
            category: 6,
            botPermissions: [],
            userPermissions: ["MANAGE_GUILD"]
        });
    }

    async run(message, args) {
        let embed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`**Support Languages**\n\n● :flag_us: English\n● :flag_es: Español`)
            .setColor(0x6666ff)
            .setTimestamp()
            .setFooter(`Actual Language: ${this.lang.nativeName.firstUpperCase()}`)
        let msg = await message.channel.send(embed)
        await msg.react("🇺🇸")
        await msg.react("🇪🇸")
        const filter = (emojis, usuario) => (emojis.emoji.name == "🇺🇸" || emojis.emoji.name == "🇪🇸") && usuario.id === message.author.id;
        const collector = msg.createReactionCollector(filter, { time: 20000 });
        collector.on("collect", (emojis) => {
            if (emojis.emoji.name === "🇺🇸") {
                this.guild.language = "en";
                this.guild.save()
                message.channel.send(`OK! All commands are in english language`)
            };
            if (emojis.emoji.name === "🇪🇸") {
                this.guild.language = "es";
                this.guild.save()
                message.channel.send(`Ok! Ahora todos los comandos estaran en español`)
            };

        });
    }
}