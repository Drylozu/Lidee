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
        else {
            let embed = new MessageEmbed()
                .setAuthor(this.lang.getHelp("title"), message.author.displayAvatarURL())
                .setDescription(`>>> ${this.lang.getHelp("description", this.client.user.username, this.guild.prefix, `[${this.lang.getEmoji("inviteBot")}](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=268462110)`)}`)
                .setFooter(this.lang.getHelp("footer", this.client.commands.filter((c) => !c.ownerOnly).size))
                .setTimestamp()
                .setColor(0x6666ff);

            let cmdsCategories = [];
            for (let i = 0; i < this.lang.getHelp("categories").length; i++)
                cmdsCategories.push([]);

            this.client.commands.forEach((cmd) => {
                if (cmd.category < 1) return;
                if (cmd.ownerOnly) return;
                cmdsCategories[cmd.category - 1].push(cmd);
            });

            cmdsCategories.forEach((cat, i) => {
                if (cat.length < 1) return;
                embed.addField(
                    this.lang.getHelp("categories")[i],
                    cat.map((c) => `\`${c.name}\``).join(" ")
                );
            });

            message.channel.send(embed);
        }
    }
}
