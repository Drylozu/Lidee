const Command = require("../structures/Command.js");

module.exports = class Clearmsg extends Command {
    constructor(client) {
        super(client, {
            name: "clearmsg",
            category: "Moderation",
            description: "No Provided...",
            botPermissions: ["MANAGE_MESSAGES"],
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }

    run(message, args) {
        let messages = parseInt(args[0]);
        if (!messages) return message.channel.send('Coloca el numero de mensajes a eliminar');
        if (messages < 1 || messages > 50) return message.channel.send('El limite de mensajes es 50 :( y el menor es 1');

        message.channel.bulkDelete(messages, true)
            .then(noname => message.channel.send(`se eliminaron ${messages} mensajes :)`))
    }
}