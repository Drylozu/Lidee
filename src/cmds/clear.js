const Command = require("../structures/Command");

module.exports = class Clear extends Command {
    constructor(client) {
        super(client, {
            name: "clear",
            category: 5,
            aliases: ["prune", "purge"],
            botPermissions: ["MANAGE_MESSAGES"],
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }

    async run(message, [messages]) {
        if (!messages || !parseInt(messages)) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("clearNumber")}`);
        if (parseInt(message) < 1 || parseInt(messages) > 100) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("clearLimit")}`);

        try {
            await message.delete();
            await message.channel.bulkDelete(messages, true);
            let msg = await message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("clear", parseInt(messages))}`)
            msg.delete({ timeout: 5000 });
        } catch (e) {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("clearError")}`);
        }
    }
}