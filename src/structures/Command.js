module.exports = class Command {
    constructor(client, options) {
        this.client = client;
        this.name = options.name;
        this.aliases = options.aliases || [];
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
        let messageSent = false;

        if (this.ownerOnly)
            if (!this.client.ownersId.includes(message.author.id))
                conditionals.ownerOnly = true;

        if (this.userPermissions.length > 0)
            if (!message.member.hasPermission(this.userPermissions)) {
                conditionals.userPermissions = true;
                if (!messageSent) {
                    message.channel.send(this.lang.get("userPerms", this.userPermissions));
                    messageSent = true;
                }
            }

        if (this.botPermissions.length > 0)
            if (!message.guild.me.hasPermission(this.botPermissions)) {
                conditionals.botPermissions = true;
                if (!messageSent) {
                    message.channel.send(this.lang.get("botPerms", this.botPermissions));
                    messageSent = true;
                }
            }

        if (this.nsfw)
            if (!message.channel.nsfw) {
                conditionals.nsfw = true;
                if (!messageSent) {
                    message.channel.send(this.lang.get("nsfwChannel"));
                    messageSent = true;
                }
            }

        return conditionals;
    }
}