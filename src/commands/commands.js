const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class Commands extends Command {
    constructor(client) {
        super(client, {
            name: 'commands',
            category: 1,
            aliases: ['cmds', 'cmmds'],
            botPermissions: ['channel', 'EMBED_LINKS']
        });
    }

    run(message) {
        const embed = new MessageEmbed()
            .setAuthor(this.lang.getHelp('titleCommands'), message.author.displayAvatarURL())
            .setFooter(this.lang.getHelp('footer', this.client.commands.filter((c) => !c.ownerOnly).size))
            .setTimestamp()
            .setColor(0x6666ff);

        const cmdsCategories = [];
        for (let i = 0; i < this.lang.getHelp('categories').length; i++)
            cmdsCategories.push([]);

        this.client.commands.forEach((cmd) => {
            if (cmd.category < 1) return;
            if (cmd.ownerOnly) return;
            cmdsCategories[cmd.category - 1].push(cmd);
        });

        cmdsCategories.forEach((cat, i) => {
            if (cat.length < 1) return;
            if (i === 6 && !message.channel.nsfw)
                embed.addField(
                    this.lang.getHelp('categories')[i],
                    this.lang.getHelp('nsfw')
                );
            else
                embed.addField(
                    this.lang.getHelp('categories')[i],
                    cat.map((c) => `\`${c.name}\``).join(' ')
                );
        });

        message.channel.send(embed);
    }
};