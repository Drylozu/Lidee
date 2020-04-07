const Command = require("../structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            category: 1,
            aliases: ["h"]
        });
    }

    async run(message) {
        let embed = new MessageEmbed()
            .setAuthor(this.lang.getHelp("title"), message.author.displayAvatarURL())
            .setDescription(`>>> ${this.lang.getHelp("description", this.client.user.username, this.guild.prefix)}`)
            .setFooter(this.lang.getHelp("footer", this.client.commands.size))
            .setTimestamp()
            .setColor(0x66ff66);

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
                cat.map((c) => `\`${c.name}\``).join(", ")
            );
        });

        message.channel.send(embed);
    }
}
