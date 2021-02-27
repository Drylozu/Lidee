const Command = require('../structures/Command');

module.exports = class Unban extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            category: 5,
            botPermissions: ['guild', 'BAN_MEMBERS'],
            userPermissions: ['guild', 'BAN_MEMBERS']
        });
    }

    async run(message, args) {
        const member = await this.client.users.fetch(args[0]);
        if (!member) return message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('unbanNoUser')}`);
        const banned = await message.guild.fetchBan(args[0]);
        if (!banned) return message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('unbanNo')}`);

        try {
            await message.guild.members.unban(args[0], `${message.author.tag}.${args.slice(1).join(' ').length > 0 ? ` ${args.slice(1).join(' ')}` : ''}`);
            message.channel.send(`${this.lang.getEmoji('okay')} ${this.lang.get('unban', member.user.tag)}`);
        } catch (e) {
            message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('unbanError')}`);
        }
    }
};