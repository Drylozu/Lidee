const { MessageAttachment } = require("discord.js");
const Command = require("../structures/Command");

module.exports = class Trump extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            category: 5,
            botPermissions: ["guild", "BAN_MEMBERS"],
            userPermissions: ["guild", "BAN_MEMBERS"]
        });
    }

    async run(message, args) {
        let member = await this.client.users.fetch(args[0]);
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("userNo")}`);
        let guildBans = await message.guild.fetchBans();
        if (!guildBans.has(args[0])) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("unbanNo")}`);

        await message.guild.members.unban(args[0])
        message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("unban", member)}`);
    }
}