const { MessageEmbed } = require("discord.js");

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

        let lang = this.client.languages.get(guild.language);
        let channelMessages = newState.guild.channels.resolve(guild.logs.voice);
        let channelAll = newState.guild.channels.resolve(guild.logs.all);
        let channel = channelMessages || channelAll;

        if(!oldState.channelID && newState.channelID) {
            channel.send(new MessageEmbed()
            .setAuthor(newState.guild.nameAcronym, newState.guild.iconURL())
            .setDescription(`> ${lang.get("joinVoice", newState.member.user.tag, newState.member.id, `${lang.getEmoji("voiceChannel")} **${newState.channel.name}**`)}`)
            .setFooter(`${lang.get("updateVoice")}`, newState.member.user.displayAvatarURL())
            .setColor(0xff6666)
            .setTimestamp());
        } else if(oldState.channelID && !newState.channelID) {
            channel.send(new MessageEmbed()
            .setAuthor(newState.guild.nameAcronym, newState.guild.iconURL())
            .setDescription(`> ${lang.get("leaveVoice", oldState.member.user.tag, oldState.member.id, `${lang.getEmoji("voiceChannel")} **${oldState.channel.name}**`)}`)
            .setFooter(`${lang.get("updateVoice")}`, newState.member.user.displayAvatarURL())
            .setColor(0xff6666)
            .setTimestamp());
        } else if(oldState.channelID && newState.channelID && oldState.channelID !== newState.channelID) {
            channel.send(new MessageEmbed().setAuthor(newState.guild.nameAcronym, newState.guild.iconURL())
            .setDescription(`> ${lang.get("changeVoice", oldState.member.user.tag, oldState.member.id, `${lang.getEmoji("voiceChannel")} **${oldState.channel.name}**`, `${lang.getEmoji("voiceChannel")} **${newState.channel.name}**`)}`)
            .setFooter(`${lang.get("updateVoice")}`, newState.member.user.displayAvatarURL())
            .setColor(0xff6666)
            .setTimestamp());
        } else if(!oldState.streaming && newState.streaming) {
            channel.send(new MessageEmbed()
            .setAuthor(newState.guild.nameAcronym, newState.guild.iconURL())
            .setDescription(`> ${lang.get("startStreaming", oldState.member.user.tag, oldState.member.id, `${lang.getEmoji("voiceChannel")} **${newState.channel.name}**`)}`)
            .setFooter(`${lang.get("updateVoice")}`, newState.member.user.displayAvatarURL())
            .setColor(0xff6666)
            .setTimestamp());
        } else if(oldState.streaming && !newState.streaming) {
            channel.send(new MessageEmbed()
            .setAuthor(newState.guild.nameAcronym, newState.guild.iconURL())
            .setDescription(`> ${lang.get("endStreaming", oldState.member.user.tag, oldState.member.id, `${lang.getEmoji("voiceChannel")} **${oldState.channel.name}**`)}`)
            .setFooter(`${lang.get("updateVoice")}`, newState.member.user.displayAvatarURL())
            .setColor(0xff6666)
            .setTimestamp());
        }
    }
}