const Command = require("../structures/Command");

module.exports = class Softban extends Command {
    constructor(client) {
        super(client, {
            name: "softban",
            category: 5,
            botPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"]
        });
    }

    async run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first();
        let banDays = parseInt(args[1]);
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);
        if (!member.bannable) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("banNo")}`);

        try {
            await message.guild.members.ban(member.id, {
                days: banDays && banDays > 0 ? banDays : 1,
                reason: `${message.author.tag}.${args.slice(2).join(" ").length > 0 ? ` ${args.slice(2).join(" ")}` : ""}`
            });
            message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("ban", member.user.tag)}`);
        } catch (e) {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("banError")}`);
        }
    }
}