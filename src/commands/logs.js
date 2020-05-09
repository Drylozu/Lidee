const Command = require("../structures/Command");

module.exports = class Logs extends Command {
    constructor(client) {
        super(client, {
            name: "logs",
            category: 5,
            userPermissions: ["guild", "MANAGE_MESSAGES"]
        });
    }

    async run(message, [log, channel]) {
        if (!log || !["messages"].includes(log.toLowerCase())) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("logsNoOption")}`);
        let channelParsed = message.guild.channels.resolve(channel) || message.mentions.channels.first() || (channel && channel.length > 2 ? message.guild.channels.cache.sort((a, b) => a.name.localeCompare(b.name)).find((r) => r.name.toLowerCase().includes(channel.toLowerCase())) : null);
        if (!channelParsed || (typeof channel === "string" && channel.toLowerCase() !== "none")) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("logsNoValid")}`);
        if (!channelParsed.permissionsFor(this.client.user).has("SEND_MESSAGES")) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("logsNoPermissions")}`);
        this.guild.logs[log] = channelParsed.id || channel;
        if (typeof channel === "string" && channel.toLowerCase() === "none")
            message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("logsReset", this.lang.getConstant("logs", log))}`);
        else
            message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("logs", this.lang.getConstant("logs", log), channelParsed.toString())}`);
    }
}