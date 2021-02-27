const { MessageEmbed } = require('discord.js');

module.exports = class EventMessageDelete {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (message.partial)
            await message.fetch();

        if (!message.content && message.attachments.size < 1) return;
        let guild = await this.client.db.guilds.findOne({ _id: message.guild.id }).exec();
        if (!guild) {
            guild = new this.client.db.guilds({
                _id: message.guild.id
            });
            guild.save();
        }

        const lang = this.client.languages.get(guild.language);
        const channelMessages = message.guild.channels.resolve(guild.logs.messages);
        const channelAll = message.guild.channels.resolve(guild.logs.all);
        const channel = channelMessages || channelAll;

        if (channel)
            channel.send(new MessageEmbed()
                .setAuthor(message.guild.nameAcronym, message.guild.iconURL())
                .setDescription(`> ${lang.get('messageDelete', message.author.tag, lang.get('id', message.author.id))}\n\n${message.content.slice(0, 1700)}\n\n${message.attachments.map((a) => `[${a.name}](${a.proxyURL})`).join(' - ')}`)
                .setFooter(`${lang.get('messageDeleted')}`, message.author.displayAvatarURL())
                .setColor(0xff6666)
                .setTimestamp());
    }
};