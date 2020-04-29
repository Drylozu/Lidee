const Command = require("../structures/Command");

module.exports = class Ban extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            category: 5,
            botPermissions: ["guild", "BAN_MEMBERS"],
            userPermissions: ["guild", "BAN_MEMBERS"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);
        if (!member.bannable) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("banNo")}`);
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0 || message.guild.owner.id == member.id) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("banPermissions")}`);

        try {
            await message.guild.members.ban(member.id, {
                reason: `${message.author.tag}.${args.slice(1).join(" ").length > 0 ? ` ${args.slice(1).join(" ")}` : ""}`
            });
            message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("ban", member.user.tag)}`);
        } catch (e) {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("banError")}`);
        }
    }
}
