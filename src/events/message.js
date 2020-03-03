module.exports = class EventMessage {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (message.channel.type === "dm") return;
        if (message.author.bot) return;

        let guild = await this.client.db.guilds.findOne({ _id: message.guild.id }).exec();
        if (!guild) {
            guild = new this.client.db.guilds({
                _id: message.guild.id
            });
            guild.save();
        }

        if (!message.content.startsWith(guild.prefix)) return;
        let args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();
        let err = false;

        try {
            let cmdFile = this.client.commands.find((c) => c.name === cmd || c.aliases.includes(cmd));
            if (!cmdFile) return;
            cmdFile.prepare({ guild });
            let cmdValid = cmdFile.validate({ message });
            if (!cmdValid) return;
            cmdFile.run(message, args);
        } catch (e) {
            err = true;
            this.client.log(e.toString(), true);
        } finally {
            this.client.log(`${message.author.tag} ran the command ${cmd} in ${message.guild.name}`, err);
        }
    }
}