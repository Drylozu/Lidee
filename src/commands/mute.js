const Command = require("../structures/Command");

module.exports = class Mute extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            category: 5,
            botPermissions: ["guild", "MANAGE_ROLES"],
            userPermissions: ["guild", "MANAGE_ROLES"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);

        let role = message.guild.roles.cache.find(r => r.name === `${this.client.user.username} Mute`);
        if (!role)
            role = await message.guild.roles.create({
                data: {
                    name: `${this.client.user.username} Mute`,
                    color: 0x010101,
                    position: message.guild.me.roles.cache.sort((a, b) => b.position - a.position).first().position - 1,
                    permissions: 0
                }
            });

        message.guild.channels.cache
            .filter((c) => c.manageable)
            .forEach((channel) => channel.createOverwrite(role.id, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            }));

        if (member.roles.cache.has(role.id)) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("muteNo")}`);
        await member.roles.add(role.id);
        message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("mute", member.user.tag)}`);
    }
}