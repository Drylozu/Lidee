const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

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
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0 && message.guild.owner.id !== message.author.id) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("banPermissions")}`);

        try {
             await message.guild.members.ban(member.id, {
                 reason: `${message.author.tag}.${args.slice(1).join(" ").length > 0 ? ` ${args.slice(1).join(" ")}` : ""}`
             });
            message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("ban", member.user.tag)}`);
            if(this.guild.logs.ban) {
                let channel = message.guild.channels.cache.get(this.guild.logs.ban);
                if(!channel) return;
                channel.send(new MessageEmbed().setAuthor(message.guild.nameAcronym, message.guild.iconURL())
		            .setDescription(`> El miembro ${member} (${member.id}) a sido baneado permanentemente del servidor\n\n**Moderador**: ${message.author} (${message.author.id})\n**Motivo**: ${args.slice(1).join(" ")}`)
		            .setFooter(`Miembro Baneado`, message.author.displayAvatarURL())
		            .setColor(0xff6666)
		            .setTimestamp());
            }
        } catch (e) {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("banError")}`);
        }
    }
}
