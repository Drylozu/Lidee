module.exports = class Command {
    constructor(client, options) {
        this.client = client;
        this.name = options.name;
        this.aliases = options.alises || [];
        this.nsfw = options.nsfw || false;
        this.ownerOnly = options.ownerOnly || false;
        this.category = options.category;
        this.botPermissions = options.botPermissions || [];
        this.userPermissions = options.userPermissions || [];
        this.description = options.description || "This command doesn't have description yet.";
    }

    prepare({ guild }) {
        this.guild = guild;
        //this.lang = new (require(`../languages/${this.guild.language.capitalize()}.js`))();
    }

    validate({ message }) {
        let conditionals = {
            ownerOnly: false,
            userPermissions: false,
            botPermissions: false,
            nsfw: false
        };

        if (this.ownerOnly)
            if (!this.client.ownersId.includes(message.author.id))
                conditionals.ownerOnly = true;

        if (this.userPermissions.length > 0)
            if (!message.member.hasPermission(this.userPermissions)) {
                conditionals.userPermissions = true;
                message.channel.send("You don't have permission to execute this command.");
            }

        if (this.botPermissions.length > 0)
            if (!message.guild.me.hasPermission(this.botPermissions)) {
                conditionals.botPermissions = true;
                message.channel.send("I don't have permission to execute this command.");
            }

        if (this.nsfw)
            if (!message.channel.nsfw) {
                conditionals.nsfw = true;
                message.channel.send("This command must be executed in a NSFW channel.");
            }

        return conditionals;
    }
}