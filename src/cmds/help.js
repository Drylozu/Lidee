const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            category: 1,
            aliases: ["h"],
            botPermissions: ["EMBED_LINKS"]
        });
    }

    run(message, [command]) {
        let cmdArgs = this.client.commands.find((c) => c.name === command || c.aliases.includes(command));
        if (cmdArgs)
            message.channel.send(new MessageEmbed()
                .setAuthor(cmdArgs.name, message.author.displayAvatarURL())
                .setDescription(`> ${this.lang.getHelp(`${cmdArgs.name}Description`)}${cmdArgs.aliases.length > 0 ? `\n\n**${this.lang.getHelp("aliases")}**:\n${cmdArgs.aliases.map((a) => `\`${a}\``).join(", ")}` : ""}\n\n**${this.lang.getHelp("usage")}**:\n${this.lang.getHelp(`${cmdArgs.name}Usage`, this.guild.prefix).split("\n").map((l) => `\`${l}\``).join("\n")}`)
                .setTimestamp()
                .setColor(0x6666ff));
        else message.channel.send(new MessageEmbed()
            .setAuthor(this.lang.getHelp("title"), message.author.displayAvatarURL())
            .setDescription(`>>> ${this.lang.getHelp("description", this.client.user.username, this.guild.prefix, `[${this.lang.getEmoji("inviteBot")}](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=268462110)`)}`)
            .setTimestamp()
            .setColor(0x6666ff));
    }
}
