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

        const role = member.guild.roles.resolve(guild.autorole);

        if (role)
            member.roles.add(role.id);
    }
};