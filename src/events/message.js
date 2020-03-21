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
            cmdFile.prepare({ guild });
            let cooldowned = this.handleCooldown({ message, cmd });
            let cmdValids = cmdFile.validate({ message });
            if (cooldowned || cmdValids.ownerOnly || cmdValids.userPermissions || cmdValids.botPermissions) return;
            cmdFile.run(message, args);
        } catch (e) {
            err = true;
            this.client.log(e.stack, true);
        } finally {
            this.client.log(`${message.author.tag} ran the command ${cmd} in ${message.guild.name}`, err);
        }
    }

    handleCooldown({ message, cmd }) {
        if (!this.usersCooldown.has(message.author.id)) {
            this.usersCooldown.set(message.author.id, Date.now());

            setTimeout(() => {
                this.usersCooldown.delete(message.author.id);
            }, 3000);
        } else
            return message.channel.send(cmd.lang.get("cooldown", ((Date.now() - this.usersCooldown.get(message.author.id)) / 1000).toFixed(1)));
    }
}