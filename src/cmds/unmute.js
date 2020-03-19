const Command = require("../structures/Command.js");

module.exports = class Unmute extends Command {
    constructor(client) {
        super(client, {
            name: "unmute",
            category: "Moderation",
            botPermissions: ["MANAGE_ROLES"],
            userPermissions: ["MANAGE_ROLES"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send(this.lang.get("userNo"));

        let role = message.guild.roles.cache.find(r => r.name === "Tryxer Mute");
        if (!role)
            role = await message.guild.roles.create({
                data: {
                    name: "Tryxer Mute",
                    color: 0x010101,
                    position: message.guild.me.roles.cache.sort((a, b) => b.position - a.position).first().position - 1,
                    permissions: 0
                }
            });

        message.guild.channels.cache
            .filter((c) => c.manageable)
            .forEach((channel) => {
                if (!channel.permissionOverwrites.get(role.id).deny.has("SEND_MESSAGES") ||
                    !channel.permissionOverwrites.get(role.id).deny.has("ADD_REACTIONS"))
                    channel.createOverwrite(role.id, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
            });

        if (!member.roles.cache.has(role.id)) return message.channel.send(this.lang.get("unmuteNo"));
        await member.roles.remove(role.id);
        message.channel.send(this.lang.get("unmute"));
    }
}