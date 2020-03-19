const Command = require("../structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ["h"],
            category: "Information"
        });
    }

    async run(message) {
        let moderationCommands =
            this.client.commands
                .filter((c) => c.category == 1)
                .map((c) => `\`${c.name}\` » ${this.lang.getHelp(c.name)}`);
        let prototypeCommands =
            this.client.commands
                .filter((c) => c.category == 0)
                .map((c) => `\`${c.name}\` » ${this.lang.getHelp(c.name)}`);

        let page = 0;
        let pages = [
            [
                this.lang.getHelp("titleHelp"),
                this.lang.getHelp("titleModeration"),
                this.lang.getHelp("titlePrototype")
            ],
            [
                this.lang.getHelp("descriptionHelp", client.user.username),
                this.lang.getHelp("descriptionModeration", moderationCommands.length, moderationCommands.join("\n")),
                this.lang.getHelp("descriptionPrototype", prototypeCommands.length, prototypeCommands.join("\n"))
            ]
        ];

        let msg = await message.channel.send(new MessageEmbed()
            .setTitle(pages[0][page])
            .setDescription(pages[1][page])
            .setFooter(`Page ${page + 1}/${pages[0].length}`)
            .setColor(0x7777ff)
            .setTimestamp());
        await msg.react("◀️");
        await msg.react("🟥");
        await msg.react("▶️");

        let collector = msg.createReactionCollector(
            (r, u) => ["◀️", "🟥", "▶️"].includes(r.emoji.name) && u.id === message.author.id,
            { time: 60000 });

        collector.on("collect", (r, u) => {
            r.users.remove(message.author)
                .catch(() => { });
            if (r.emoji.name === "▶️") {
                if ((page + 1) > (pages[0].length - 1)) return;
                page++;
                msg.edit(new MessageEmbed()
                    .setTitle(pages[0][page])
                    .setDescription(pages[1][page])
                    .setFooter(`Page ${page + 1}/${pages[0].length}`)
                    .setColor(0x7777ff)
                    .setTimestamp());
            } else if (r.emoji.name === "◀️") {
                if ((page - 1) < 0) return;
                page--;
                msg.edit(new MessageEmbed()
                    .setTitle(pages[0][page])
                    .setDescription(pages[1][page])
                    .setFooter(`Page ${page + 1}/${pages[0].length}`)
                    .setColor(0x7777ff)
                    .setTimestamp());
            } else if (r.emoji.name === "🟥") {
                collector.stop();
            }
        });

        collector.on("end", () => {
            msg.delete();
        });
    }
}
