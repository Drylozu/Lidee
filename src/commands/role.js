const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class Role extends Command {
    constructor(client) {
        super(client, {
            name: 'role',
            aliases: ['r'],
            category: 2,
            botPermissions: ['channel', 'EMBED_LINKS']
        });
    }

    run(message, args) {
        const role = message.guild.roles.resolve(args[0]) || message.mentions.roles.first() || (args.join(' ').length > 2 ? message.guild.roles.cache.sort((a, b) => a.name.localeCompare(b.name)).find((r) => r.name.toLowerCase().includes(args.join(' ').toLowerCase())) : null);
        if (!role) return message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('roleNo')}`);
        const embed = new MessageEmbed()
            .setAuthor(role.name, message.author.displayAvatarURL())
            .setDescription(`> ${role.hoist ? `__<@&${role.id}>__` : `<@&${role.id}>`} (${this.lang.get('id', role.id)})`)
            .addField(this.lang.get('roleCreated'), this.lang.parseCompleteDate(role.createdAt))
            .addField(this.lang.get('roleColor'), role.hexColor, true)
            .addField(this.lang.get('roleMembers'), message.guild.members.cache.filter((m) => m.roles.cache.has(role.id)).size.toLocaleString(), true)
            .addField(this.lang.get('rolePosition'), `**${role.rawPosition}**/${message.guild.roles.cache.size} (${this.lang.get('rolePositionNote')})`)
            .addField(this.lang.get('rolePermissions'), this.lang.parsePermissions(role.permissions.toArray()))
            .setColor(role.hexColor)
            .setTimestamp();

        message.channel.send(embed);
    }
};