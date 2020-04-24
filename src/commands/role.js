const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Role extends Command {
    constructor(client) {
        super(client, {
            name: "role",
            category: 2,
            botPermissions: ["channel", "EMBED_LINKS"]
        });
    }

    run(message, args) {
        let role = message.guild.roles.resolve(args[0]) || message.mentions.roles.first() || (args.join(" ").length > 2 ? message.guild.roles.cache.find((r) => r.name.includes(args.join(" "))) : null);
        if (!role) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("roleNo")}`);
        let embed = new MessageEmbed()
            .setAuthor(role.name, message.author.displayAvatarURL())
            .setDescription(`> ${role.hoist ? `__<@&${role.id}>__` : `<@&${role.id}>`} (${role.id})`)
            .addField(this.lang.get("roleCreated"), this.lang.parseCompleteDate(role.createdAt))
            .addField(this.lang.get("roleColor"), role.hexColor, true)
            .addField(this.lang.get("roleMembers"), message.guild.members.cache.filter((m) => m.roles.cache.has(role.id)).size.toLocaleString(), true)
            .addField(this.lang.get("rolePosition"), `**${role.rawPosition}**/${message.guild.roles.cache.size} (${this.lang.get("rolePositionNote")})`)
            .addField(this.lang.get("rolePermissions"), this.lang.parsePermissions(role.permissions.toArray()))
            .setColor(role.hexColor)
            .setTimestamp();

        message.channel.send(embed);
    }
}