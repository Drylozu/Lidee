const Command = require("../structures/Command.js");

module.exports = class Ban extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            category: 3,
            botPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"]
        });
    }

    run(message, args) {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send(this.lang.get("userNo"));
        if (!member.bannable) return message.channel.send(this.lang.get("banNo"));

        message.guild.members.ban(member.id, {
            reason: `${message.author.tag}.${args.join(" ").length > 0 ? ` ${args.join(" ")}` : ""}`
        }).then(() => {
            message.channel.send(this.lang.get("ban", member.user.tag));
        }).catch((e) => {
            this.client.log(e.toString(), true);
            message.channel.send(this.lang.get("banError"));
        });
    }
}