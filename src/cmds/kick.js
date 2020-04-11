const Command = require("../structures/Command");

module.exports = class Kick extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            category: 5,
            botPermissions: ["KICK_MEMBERS"],
            userPermissions: ["KICK_MEMBERS"]
        });
    }

    run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);
        if (!member.kickable) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("kickNo")}`);

        message.guild.members.kick(member.id, {
            reason: `${message.author.tag}.${args.join(" ").length > 0 ? ` ${args.join(" ")}` : ""}`
        }).then(() => {
            message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("kick")}`);
        }).catch((e) => {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("kickError")}`);
        });
    }
}