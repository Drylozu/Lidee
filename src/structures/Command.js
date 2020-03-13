//const { Collection } = require("discord.js");

module.exports = class Command {
    constructor(client, options) {
        this.client = client;
        this.name = options.name;
        this.aliases = options.alises || [];
        this.cooldown = options.cooldown || 3000;
        this.nsfw = options.nsfw || false;
        this.ownerOnly = options.ownerOnly || false;
        this.category = options.category;
        this.botPermissions = options.botPermissions || [];
        this.userPermissions = options.userPermissions || [];
        this.description = options.description || "This command doesn't have description yet.";

        //this.usersCooldown = new Collection();
    }

    prepare({ guild }) {
        this.guild = guild;
    }

    validate({ message }) {
        let conditionals = {
            ownerOnly: "none",
            userPermissions: "none",
            botPermissions: "none",
            nsfw: "none"
        };

        if (this.ownerOnly)
            if (this.client.ownersId.includes(message.author.id)) conditionals.ownerOnly = "yes";
            else conditionals.ownerOnly = "no";

        if (this.userPermissions.length > 0)
            if (message.member.hasPermission(this.userPermissions)) conditionals.userPermissions = "yes";
            else {
                message.channel.send("You don't have permission to execute this command.");
                conditionals.userPermissions = "no";
            }

        if (this.botPermissions.length > 0)
            if (message.guild.me.hasPermission(this.botPermissions)) conditionals.botPermissions = "yes";
            else {
                message.channel.send("I don't have permission to execute this command.");
                conditionals.botPermissions = "no";
            }

        if (this.nsfw)
            if (message.channel.nsfw) conditionals.nsfw = "yes";
            else {
                message.channel.send("This command must be executed in a NSFW channel.");
                conditionals.nsfw = "no";
            }

        /*
        if (this.cooldown > 0)
            if (!this.usersCooldown.has(message.author.id)) {
                this.usersCooldown.set(message.author.id, Date.now());

                setTimeout(() => {
                    this.usersCooldown.delete(message.author.id);
                }, this.cooldown);

                conditionals.cooldown = true;
            } else {
                message.channel.send(`You need wait ${((Date.now() - this.usersCooldown.get(message.author.id)) / 1000).toFixed(1)} seconds to execute this command.`);
                conditionals.cooldown = false;
            }
        */

        return conditionals;
    }
}