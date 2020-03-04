const Command = require("../structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ["h"]
        });
    }

    run(message) {

        let prototype = new RichEmbed()
            .setTitle('<:discord:682794186877173774> | Tryxer » Prototype')
            .setDescription(`los comandos que se encuentran aca estan actualmente en desarollo y no estan completos asi que puede haber errores en su ejecucion.

            ${this.client.commands.filter((c) => c.category == 'Prototype').map(x => `${this.guild.prefix}${x.name} » ${x.description}`)}`)

        let msg = await message.channel.send(new MessageEmbed()
            .setTitle("Help")
            .setDescription("React with the category that you wanna see\n- <:moderation:682792050101453088> Moderation\n-<:prototype:683123994265780285> Prototype")
            .setTimestamp());

        msg.react("682792050101453088");
        msg.react("683123994265780285");

        const filter = (emojis, usuario) => (emojis.emoji.id == "682792050101453088" || emojis.emoji.id == "683123994265780285") && usuario.id === message.author.id;
        const collector = msg.createReactionCollector(filter, {
            time: 1000000
        });
        collector.on("collect", (emojis) => {
            if (emojis.emoji.id == "682792050101453088") {
                let moderationCommands =
                    this.client.commands
                        .filter((c) => c.category == "Moderation")
                        .map((c) => `- \`${c.name}\`: ${c.description}`);
                msg.edit(new MessageEmbed()
                    .setTitle("Help - Moderation Commands")
                    .setDescription(`In this category are \`${moderationCommands.size}\` command, these are:\n${moderationCommands.join("\n")}`));
                emojis.remove(message.author.id);
            }
            if (emojis.emoji.id == "683123994265780285") {
                let prototypeCommands =
                    this.client.commands
                        .filter((c) => c.category == "Prototype")
                        .map((c) => `- \`${c.name}\`: ${c.description}`);
                msg.edit(new MessageEmbed()
                    .setTitle("Help - Prototype Commands")
                    .setDescription(`**Note**: these commands are in development, may contain errors.\nIn this category are \`${prototypeCommands.size}\` command, these are:\n${prototypeCommands.join("\n")}`));
                emojis.remove(message.author.id);
            }
        });
    }
}