const { Collection } = require("discord.js");

module.exports = class EventMessage {
    constructor(client) {
        this.client = client;
        this.usersCooldown = new Collection();
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

            if (!this.usersCooldown.has(message.author.id)) {
                this.usersCooldown.set(message.author.id, Date.now());

                setTimeout(() => {
                    this.usersCooldown.delete(message.author.id);
                }, 2500);
            } else
                return message.channel.send(`You need wait ${((Date.now() - this.usersCooldown.get(message.author.id)) / 1000).toFixed(1)} seconds to execute this command.`);
                
            cmdFile.prepare({ guild });
            let cmdValids = cmdFile.validate({ message });
            if (cmdValids.ownerOnly === "no") return;
            //if (cmdValids.cooldown && !cmdValids.ownerOnly) return;
            if (cmdValids.userPermissions === "no") return;
            if (cmdValids.botPermissions === "no") return;
            cmdFile.run(message, args);
        } catch (e) {
            err = true;
            this.client.log(e.toString(), true);
        } finally {
            this.client.log(`${message.author.tag} ran the command ${cmd} in ${message.guild.name}`, err);
        }
    }
}