const Command = require("../structures/Command");

module.exports = class Ban extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            category: 5,
            botPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"]
        });
    }

    run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);
        if (!member.bannable) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("banNo")}`);

        message.guild.members.ban(member.id, {
            reason: `${message.author.tag}.${args.slice(1).join(" ").length > 0 ? ` ${args.slice(1).join(" ")}` : ""}`
        }).then(() => {
            message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("ban", member.user.tag)}`);
        }).catch((e) => {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("banError")}`);
        });
    }
}