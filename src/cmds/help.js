const Command = require("../structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ["h"]
        });
    }

    async run(message) {
        let moderationCommands =
            this.client.commands
                .filter((c) => c.category == "Moderation")
                .map((c) => `\`${c.name}\` » ${c.description}`);
        let prototypeCommands =
            this.client.commands
                .filter((c) => c.category == "Prototype")
                .map((c) => `\`${c.name}\` » ${c.description}`);

        let page = 0;
        let pages = [
            ["Help", "Moderation Commands", "Experimental Commands"],
            [this.lang.get("help"), this.lang.get("helpModeration", moderationCommands.length, moderationCommands.join("\n")), this.lang.get("helpPrototype", prototypeCommands.length, prototypeCommands.join("\n"))]]

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
