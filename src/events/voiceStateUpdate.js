const { MessageEmbed } = require('discord.js');

module.exports = class EventVoiceStateUpdate {
    constructor(client) {
        this.client = client;
    }

    async run(oldState, newState) {
        let guild = await this.client.db.guilds.findOne({ _id: newState.guild.id }).exec();
        if (!guild) {
            guild = new this.client.db.guilds({
                _id: newState.guild.id
            });
            guild.save();
        }

        const lang = this.client.languages.get(guild.language);
        const channelMessages = newState.guild.channels.resolve(guild.logs.voice);
        const channelAll = newState.guild.channels.resolve(guild.logs.all);
        const channel = channelMessages || channelAll;

        let state = 'voiceState';
        let color = 0x0;
        const channels = [];
        if (!oldState.channelID && newState.channelID) {
            state += 'Join';
            color = 0x66ff6;
            channels.push(`${lang.getEmoji('voiceChannel')} **${newState.channel.name}**`);
        } else if (oldState.channelID && !newState.channelID) {
            state += 'Leave';
            color = 0xff6666;
            channels.push(`${lang.getEmoji('voiceChannel')} **${oldState.channel.name}**`);
        } else if (oldState.channelID && newState.channelID) {
            state += 'Change';
            color = 0xffff66;
            channels.push(`${lang.getEmoji('voiceChannel')} **${oldState.channel.name}**`);
            channels.push(`${lang.getEmoji('voiceChannel')} **${newState.channel.name}**`);
        } else if (!oldState.streaming && newState.streaming) {
            state += 'Stream';
            color = 0x66ff66;
            channels.push(`${lang.getEmoji('voiceChannel')} **${newState.channel.name}**`);
        } else if (oldState.streaming && !newState.streaming) {
            state += 'NoStream';
            color = 0xff6666;
            channels.push(`${lang.getEmoji('voiceChannel')} **${oldState.channel.name}**`);
        }

        if (channel && color !== 0x0)
            channel.send(new MessageEmbed()
                .setAuthor(newState.guild.nameAcronym, newState.guild.iconURL())
                .setDescription(`> ${lang.get(state, '', ...channels)}`)
                .setFooter(`${lang.get('voiceState')}`, newState.member.user.displayAvatarURL())
                .setColor(color)
                .setTimestamp());
    }
};