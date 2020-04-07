const Command = require("../structures/Command.js");

module.exports = class Kick extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            category: 3,
            botPermissions: ["KICK_MEMBERS"],
            userPermissions: ["KICK_MEMBERS"]
        });
    }

    run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send(this.lang.get("userNo"));
        if (!member.kickable) return message.channel.send(this.lang.get("kickNo"));

        message.guild.members.kick(member.id, {
            reason: `${message.author.tag}.${args.join(" ").length > 0 ? ` ${args.join(" ")}` : ""}`
        }).then(() => {
            message.channel.send(this.lang.get("kick"));
        }).catch((e) => {
            this.client.log(e.toString(), true);
            message.channel.send(this.lang.get("kickError"));
        });
    }
}