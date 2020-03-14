const Command = require("../structures/Command.js");

module.exports = class Softban extends Command {
    constructor(client) {
        super(client, {
            name: "softban",
            category: "Moderation",
            description: "No Provided...",
            botPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"]
        });
    }

    run(message, args) {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        let banDays = parseInt(args[1]);
        if (!member) return message.channel.send("You need to mention an user or provide his ID.");
        if (!member.bannable) return message.channel.send("I don't able to ban that member.");

        message.guild.members.ban(member.id, {
            days: banDays && banDays > 0 ? banDays : 1,
            reason: `${message.author.tag}.${args.slice(1).join(" ").length > 0 ? ` ${args.slice(1).join(" ")}` : ""}`
        }).then(() => {
            message.channel.send(`The member **${member.user.tag}** has been banned from the server.`)
        }).catch((e) => {
            this.client.log(e.toString(), true);
            message.channel.send("An error ocurred while banning the member.");
        });
    }
}