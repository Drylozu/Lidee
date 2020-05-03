const Command = require("../structures/Command");

module.exports = class Logs extends Command {
    constructor(client) {
        super(client, {
            name: "logs",
            category: 5,
            userPermissions: ["guild", "MANAGE_MESSAGES"]
        });
    }

    async run(message, args) {
        if(!["messages"].includes(args[0])) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("logsNoOption")}`);
        let channel = message.guild.channels.resolve(args[1]) || message.mentions.channels.first() || (args.slice(1).join(" ").length > 2 ? message.guild.channels.cache.sort((a, b) => a.name.localeCompare(b.name)).find((r) => r.name.toLowerCase().includes(args.slice(1).join(" ").toLowerCase())) : null);
        if(!channel) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("logsNoValid")}`);
        if(!channel.permissionsFor(this.client.user).has("SEND_MESSAGES")) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("logsNoPermissions")}`)
        switch(args[0].toLowerCase()) {
            case "messages": 
                this.guild.logs.messages = channel.id
                this.guild.save();
        }
        message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("logsSave")}`)
    }
}
