const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Commands extends Command {
    constructor(client) {
        super(client, {
            name: "commands",
            category: 1,
            aliases: ["cmds", "cmmds"],
            botPermissions: ["EMBED_LINKS"]
        });
    }

    run(message) {
        let embed = new MessageEmbed()
            .setAuthor(this.lang.getHelp("titleCommands"), message.author.displayAvatarURL())
            .setFooter(this.lang.getHelp("footer", this.client.commands.filter((c) => !c.ownerOnly).size))
            .setTimestamp()
            .setColor(0x6666ff)

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