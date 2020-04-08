const { Collection } = require("discord.js");

module.exports = class EventMessage {
    constructor(client) {
        this.client = client;
        this.usersCooldown = new Collection();
    }

    async run(message) {
        if (message.channel.type === "dm") return;
        if (message.author.bot) return;

        // GUILD PREPARE
        let guild = await this.client.db.guilds.findOne({ _id: message.guild.id }).exec();
        if (!guild) {
            guild = new this.client.db.guilds({
                _id: message.guild.id
            });
            guild.save();
        }
        // USER PREPARE
        let user = await this.client.db.users.findOne({ _id: message.author.id }).exec();
        if (!user) {
            user = new this.client.db.users({
                _id: message.author.id
            });
            user.save();
        }

        let isClientMentioned = () => {
            return (message.content.startsWith(`<@${this.client.user.id}>`) || message.content.startsWith(`<@!${this.client.user.id}>`))
        }

        if ((!message.content.startsWith(guild.prefix) && !isClientMentioned())) return;
        let args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();
        let err = false;

        if (isClientMentioned()) {
            if (args[0]) {
                cmd = args[0];
                args.splice(0, 1)
            }
        }

        try {
            let cmdFile = this.client.commands.find((c) => c.name === cmd || c.aliases.includes(cmd));
            if (!cmdFile) return;
            cmdFile.prepare({ guild, user });
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