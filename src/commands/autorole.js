const Command = require('../structures/Command');

module.exports = class Autorol extends Command {
    constructor(client) {
        super(client, {
            name: 'autorole',
            category: 4,
            userPermissions: ['guild', 'MANAGE_ROLES']
        });
    }

    async run(message, args) {
        const role = message.guild.roles.resolve(args[0]) || message.mentions.roles.first() || (args.join(' ').length > 2 ? message.guild.roles.cache.sort((a, b) => a.name.localeCompare(b.name)).find((r) => r.name.toLowerCase().includes(args.join(' ').toLowerCase())) : null);
        if (args[0] !== 'none' && !role) return message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('autoroleNo')}`);
        this.guild.autorole = role.id;
        this.guild.save();
        message.channel.send(`${this.lang.getEmoji('okay')} ${this.lang.get('autorole', role.name)}`);
    }
};