const Command = require('../structures/Command');

module.exports = class Multimedia extends Command {
    constructor(client) {
        super(client, {
            name: 'multimedia',
            aliases: ['files', 'media'],
            category: 4,
            userPermissions: ['guild', 'MANAGE_MESSAGES']
        });
    }

    run(message, [channel]) {
        const channelParsed = message.guild.channels.resolve(channel) || message.mentions.channels.first() || (channel && channel.length > 2 ? message.guild.channels.cache.sort((a, b) => a.name.localeCompare(b.name)).find((r) => r.name.toLowerCase().includes(channel.toLowerCase())) : null);
        const channelId = channelParsed ? channelParsed.id : channel;
        if (!channelId && channel !== 'none')
            if (message.guild.channels.cache.get(this.guild.multimedia)) return message.channel.send(`${this.lang.get('multimedia', `<#${this.guild.multimedia}>`)}\n${this.lang.get('multimediaChange', this.guild.prefix)}`);
            else return message.channel.send(`${this.lang.get('multimediaNo')}\n${this.lang.get('multimediaChange', this.guild.prefix)}`);
        if (channelParsed && !channelParsed.permissionsFor(this.client.user).has('MANAGE_MESSAGES')) return message.channel.send(`${this.lang.getEmoji('error')} ${this.lang.get('multimediaNoPermissions')}`);
        this.guild.multimedia = channelId;
        this.guild.save();
        if (channel === 'none')
            message.channel.send(`${this.lang.getEmoji('okay')} ${this.lang.get('multimediaReset')}`);
        else
            message.channel.send(`${this.lang.getEmoji('okay')} ${this.lang.get('multimediaChanged', `<#${channelId}>`)}`);
    }
};