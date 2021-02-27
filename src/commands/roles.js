const Command = require('../structures/Command');

module.exports = class Roles extends Command {
    constructor(client) {
        super(client, {
            name: 'roles',
            aliases: ['rs'],
            category: 5,
            userPermissions: ['guild', 'MANAGE_ROLES']
        });
    }

    async run(message, args) {
        const member = message.guild.members.resolve(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('userNo')}`);
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0 && message.guild.owner.id !== message.author.id) return message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('rolesPermissions')}`);
        if (!args[1] || !['add', 'remove'].includes(args[1].toLowerCase())) return message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('rolesNoOption')}`);

        const memberRoles = member.roles.cache.array().slice();
        let roles = [...message.mentions.roles.array(), ...args.slice(2).map((a) => message.guild.roles.resolve(a)), ...[message.guild.roles.cache.find((r) => r.name.toLowerCase().includes(args.slice(2).join(' ').toLowerCase()))]].filter((r) => r);
        if (roles.length < 1) return message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('rolesNoValid')}`);

        try {
            roles = roles.filter((r) => message.member.roles.highest.comparePositionTo(r) < 0);
            await member.roles[args[1].toLowerCase()](roles);
            const rolesChanged = args[1].toLowerCase() === 'add' ? member.roles.cache.array().filter((r) => !memberRoles.includes(r)) : memberRoles.filter((r) => !member.roles.cache.array().includes(r));
            if (rolesChanged.length > 0)
                message.channel.send(`${this.lang.getEmoji('okay')} ${this.lang.get(`roles${rolesChanged.length > 1 ? 'Plural' : 'Singular'}${args[1].firstUpperCase()}`, rolesChanged.length, member.user.tag)}`);
            else message.channel.send(`${this.lang.getEmoji('okay')} ${this.lang.get(`rolesNone${args[1].firstUpperCase()}`, member.user.tag)}`);
        } catch (e) {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('rolesError')}`);
        }
    }
};