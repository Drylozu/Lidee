const Command = require("../structures/Command.js");

module.exports = class Clearmsg extends Command {
    constructor(client) {
        super(client, {
            name: "clear",
            aliases: ["prune"],
            category: "Moderation",
            botPermissions: ["MANAGE_MESSAGES"],
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }

    run(message, args) {
        let messages = parseInt(args[0]);
        if (!messages) return message.channel.send(this.lang.get("clearNumber"));
        if (messages < 1 || messages > 100) return message.channel.send(this.lang.get("clearLimit"));

        message.channel.bulkDelete(messages, true)
            .then(() => {
                message.channel.send(this.lang.get("clear", messages))
                    .then((m) => {
                        m.delete({
                            timeout: 5000
                        });
                    });
            }).catch((e) => {
                this.client.log(e.toString(), true);
                message.channel.send(this.lang.get("clearError"));
            });
    }
}