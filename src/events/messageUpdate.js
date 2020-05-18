const { MessageEmbed } = require("discord.js");

module.exports = class EventMessageUpdate {
    constructor(client) {
        this.client = client;
    }

    async run(oldMessage, newMessage) {
        if (oldMessage.partial)
            await oldMessage.fetch();
        if (newMessage.partial)
            await newMessage.fetch();

        if (oldMessage.content === newMessage.content) return;
        let guild = await this.client.db.guilds.findOne({ _id: newMessage.guild.id }).exec();
        if (!guild) {
            guild = new this.client.db.guilds({
                _id: newMessage.guild.id
            });
            guild.save();
        }

        let lang = this.client.languages.get(guild.language);
        let channelMessages = newMessage.guild.channels.resolve(guild.logs.messages);
        let channelAll = newMessage.guild.channels.resolve(guild.logs.all);
        let channel = channelMessages || channelAll;
        if (!channel) return;
        channel.send(new MessageEmbed()
            .setAuthor(newMessage.guild.nameAcronym, newMessage.guild.iconURL())
            .setDescription(`> ${lang.get("messageEdit", newMessage.author.tag, lang.get("id", newMessage.author.id))}\n${oldMessage.attachments.map((a) => `[${a.name}](${a.proxyURL})`).join(" - ")}`)
            .addField(`${lang.get("messageBefore")}`, oldMessage.content)
            .addField(`${lang.get("messageAfter")}`, newMessage.content)
            .setFooter(`${lang.get("messageEdited")}`, newMessage.author.displayAvatarURL())
            .setColor(0xff6666)
            .setTimestamp());
    }
}