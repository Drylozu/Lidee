const Command = require("../structures/Command");

module.exports = class Kick extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            category: 5,
            botPermissions: ["guild", "KICK_MEMBERS"],
            userPermissions: ["guild", "KICK_MEMBERS"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);
        if (!member.kickable) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("kickNo")}`);
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0 && message.guild.owner.id !== message.author.id) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("kickPermissions")}`);

        try {
            await member.kick(member.id, {
                reason: `${message.author.tag}.${args.slice(1).join(" ").length > 0 ? ` ${args.slice(1).join(" ")}` : ""}`
            });
            message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("kick", member.user.tag)}`);
        } catch (e) {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("kickError")}`);
        }
    }
}
