const { MessageEmbed } = require("discord.js");

module.exports = class EventGuildMemberAdd {
    constructor(client) {
        this.client = client;
    }

    async run(member) {

        let guild = await this.client.db.guilds.findOne({ _id: member.guild.id }).exec();
        if (!guild) {
            guild = new this.client.db.guilds({
                _id: member.guild.id
            });
            guild.save();
        }

        if(guild.autorol) {
            guild.autorol.forEach(role => {
                if(!member.guild.roles.cache.get(role)) return;
                member.roles.add(role)
            })
        }
       
    }
}