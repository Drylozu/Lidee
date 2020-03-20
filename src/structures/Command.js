module.exports = class Command {
    constructor(client, options) {
        this.client = client;
        this.name = options.name;
        this.aliases = options.alises || [];
        this.nsfw = options.nsfw || false;
        this.ownerOnly = options.ownerOnly || false;
        this.category = options.category || -1;
        this.botPermissions = options.botPermissions || [];
        this.userPermissions = options.userPermissions || [];
    }

    prepare({ guild }) {
        this.guild = guild;
        this.lang = this.client.languages.get(this.guild.language);
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
                message.channel.send(this.lang.get("userPerms", this.userPermissions));
            }

        if (this.botPermissions.length > 0)
            if (!message.guild.me.hasPermission(this.botPermissions)) {
                conditionals.botPermissions = true;
                message.channel.send(this.lang.get("botPerms", this.botPermissions));
            }

        if (this.nsfw)
            if (!message.channel.nsfw) {
                conditionals.nsfw = true;
                message.channel.send(this.lang.get("nsfwChannel"));
            }

        return conditionals;
    }
}