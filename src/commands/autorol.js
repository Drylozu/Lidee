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
        let roles = message.mentions.roles;
        let newRoles = []
        if(roles.size <= 0) return message.channel.send("nope")
        roles.forEach(role => {
            newRoles.push(role.id)
        })
        this.guild.autorol = newRoles;
        this.guild.save()
    }
}