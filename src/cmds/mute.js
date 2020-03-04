const Command = require("../structures/Command.js");

module.exports = class Mute extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            category: "Moderation",
            description: "Mutes an user from the member",
            botPermissions: ["MANAGE_ROLES"],
            userPermissions: ["MANAGE_ROLES"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.get(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send("You need to mention an user or provide his ID.");

        let role = message.guild.roles.find(r => r.name === "TMuted.");
        if (!role) {
            role = await message.guild.createRole({
                name: "TMuted.",
                color: 0x010101,
                position: message.guild.me.roles.find((r) => r.managed).calculatedPosition - 1,
                permissions: 0
            });
            message.guild.channels.forEach((channel) => {
                channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }

        if (member.roles.has(role.id)) return message.channel.send("That member is already muted!");
        await member.addRole(role.id);
        message.channel.send(`The member **${member.user.tag}** has been muted from the server.`);
    }
}