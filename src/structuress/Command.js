const { Collection } = require("discord.js");

module.exports = class Command {
    constructor(client, options) {
        this.client = client;
        this.name = options.name;
        this.aliases = options.alises || [];
        this.cooldown = options.cooldown || 0;
        this.nsfw = options.nsfw || false;
        this.ownerOnly = options.ownerOnly || false;
        this.category = options.category;
        this.botPermissions = options.botPermissions || [];
        this.userPermissions = options.userPermissions || [];
        this.description = options.description || "This command doesn't have description yet.";

        this.usersCooldown = new Collection();
    }

    prepare({ guild }) {
        this.guild = guild;
    }

    validate({ message }) {
        if (this.devOnly)
            if (this.client.ownersId.includes(message.author.id)) return true;

        if (this.cooldown > 0)
            if (!this.usersCooldown.has(message.author.id)) {
                this.usersCooldown.set(message.author.id, Date.now());

                setTimeout(() => {
                    this.usersCooldown.delete(message.author.id);
                }, this.cooldown);

                return true;
            } else message.channel.send(`You need wait ${Date.now() - this.usersCooldown.get(message.author.id)} miliseconds to execute this command.`);

        if (this.nsfw)
            if (message.channel.nsfw) return true;
            else message.channel.send("This command must be executed in a NSFW channel.");

        if (this.userPermissions.length > 0)
            if (message.member.hasPermission(this.userPermissions)) return true;
            else message.channel.send("You don't have permission to execute this command.");

        if (this.botPermissions.length > 0)
            if (message.guild.me.hasPermission(this.botPermissions)) return true;
            else message.channel.send("I don't have permission to execute this command.");
    }
}