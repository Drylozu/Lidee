const Command = require("../structures/Command.js");

module.exports = class Softban extends Command {
    constructor(client) {
        super(client, {
            name: "softban",
            category: 1,
            botPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"]
        });
    }

    run(message, args) {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        let banDays = parseInt(args[1]);
        if (!member) return message.channel.send(this.lang.get("userNo"));
        if (!member.bannable) return message.channel.send(this.lang.get("banNo"));

        message.guild.members.ban(member.id, {
            days: banDays && banDays > 0 ? banDays : 1,
            reason: `${message.author.tag}.${args.slice(2).join(" ").length > 0 ? ` ${args.slice(2).join(" ")}` : ""}`
        }).then(() => {
            message.channel.send(this.lang.get("ban", member.user.tag));
        }).catch((e) => {
            this.client.log(e.toString(), true);
            message.channel.send(this.lang.get("banError"));
        });
    }
}