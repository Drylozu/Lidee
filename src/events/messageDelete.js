const { MessageEmbed } = require("discord.js");

module.exports = class EventMessageDelete {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        let guild = await this.client.db.guilds.findOne({ _id: message.guild.id }).exec();
        if (!guild) {
            guild = new this.client.db.guilds({
                _id: message.guild.id
            });
            guild.save();
        }

        let lang = this.client.languages.get(guild.language);
        let channelMessages = message.guild.channels.resolve(guild.logs.messages);
        let channelAll = message.guild.channels.resolve(guild.logs.all);
        let channel = channelMessages || channelAll;
        if (channel)
            channel.send(new MessageEmbed().setAuthor(message.guild.nameAcronym, message.guild.iconURL())
                .setDescription(`> ${lang.get("messageDelete", message.author.tag, lang.get("id", message.author.id))}\n${message.content}`)
                .setFooter(`${lang.get("messageDeleted")}`, message.author.displayAvatarURL())
                .setColor(0xff6666)
                .setTimestamp());
    }
}
