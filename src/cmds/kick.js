const Command = require("../structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Kick extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            category: "Moderation",
            description: "Kicks a member from the server.",
            botPermissions: ["KICK_MEMBERS"],
            userPermissions: ["KICK_MEMBERS"]
        });
    }

    run(message, args) {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!member) return message.channel.send("You need to mention an user or provide his ID.");
        if (!member.kickable) return message.channel.send("I don't able to kick that member.");
        message.guild.members.kick(member.id, {
            reason: `${message.author.tag}.${args.join(" ").length > 0 ? ` ${args.join(" ")}` : ""}`
        }).then(() => message.channel.send(`The member **${member.user.tag}** has been kicked from the server.`))
            .catch((e) => {
                this.client.log(e.toString(), true);
                message.channel.send("An error ocurred while kicking the member.");
            });
    }
}