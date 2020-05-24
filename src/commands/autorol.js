const Command = require("../structures/Command");

module.exports = class Autorol extends Command {
    constructor(client) {
        super(client, {
            name: "autorol",
            category: 4,
            userPermissions: ["guild", "MANAGE_GUILD"]
        });

    }

    async run(message, args) {
        let roles = message.mentions.roles.array() || args.map((a) => message.guild.roles.resolve(a)) || message.guild.roles.cache.find((r) => r.name.toLowerCase().includes(args.join(" ").toLowerCase()));
        if(roles.size <= 0 || roles.length <= 0 || !roles) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("noRoles")}`)
        this.guild.autorol = roles.map(role => role.id);
        this.guild.save()
        message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("autorolSave")}`)
    }
}