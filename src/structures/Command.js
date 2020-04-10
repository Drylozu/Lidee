const UserFlags = require("./UserFlags");

module.exports = class Command {
    constructor(client, options) {
        this.client = client;
        this.name = options.name;
        this.nsfw = options.nsfw || false;
        this.aliases = options.aliases || [];
        this.category = options.category || -1;
        this.ownerOnly = options.ownerOnly || false;
        this.premiumOnly = options.premiumOnly || false;
        this.botPermissions = options.botPermissions || [];
        this.userPermissions = options.userPermissions || [];
    }

    prepare({ guild, user }) {
        this.guild = guild;
        this.user = user;
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
            if (!new UserFlags(this.user.flags).has("DEVELOPER"))
                conditionals.ownerOnly = true;

        if (this.premiumOnly)
            if (!this.guild.premium) {
                conditionals.premiumOnly = true;
                if (!messageSent) {
                    message.channel.send(this.lang.get("premiumOnly"));
                    messageSent = true;
                }
            }

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