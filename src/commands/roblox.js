const { MessageEmbed } = require("discord.js");
const Command = require("../structures/Command");

module.exports = class Roblox extends Command {
    constructor(client) {
        super(client, {
            name: "roblox",
            aliases: ["rblx", "rb"],
            category: 1,
            botPermissions: ["channel", "EMBED_LINKS"]
        });
    }

    async run(message, args) {
        if (args.join(" ").length < 1) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("robloxNo")}`);
        let user = await this.client.apis.roblox.getUserBasics(args.join(" "));
        if (user.errorMessage) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("robloxNo")}`);
        let friends = await this.client.apis.roblox.getUserFriends(user.Id);
        let groups = await this.client.apis.roblox.getUserGroups(user.Id);
        message.channel.send(new MessageEmbed()
            .setAuthor(user.Username, message.author.displayAvatarURL())
            .setDescription(`**${this.lang.get("robloxOnline")}**: ${user.IsOnline ? this.lang.getEmoji("okay") : this.lang.getEmoji("error")}\n**${this.lang.get("robloxGroups")}**: ${groups.length}\n**${this.lang.get("robloxFriends")}**: ${friends.length}`)
            .setImage(`https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=${encodeURIComponent(user.Username)}`)
            .setColor(0xff6666)
            .setFooter(this.lang.get("id", user.Id))
            .setTimestamp());
    }
}