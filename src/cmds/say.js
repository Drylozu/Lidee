const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Say extends Command {
    constructor(client) {
        super(client, {
            name: "say",
            category: 5,
            botPermissions: ["EMBED_LINKS"],
            userPermissions: ["MENTION_EVERYONE"]
        });
    }

    run(message, args) {
        let msg = args.join(' ');
        if (!msg || msg.length <= 0) return;

        let permisos = message.channel.permissionsFor(message.member);

        // Ahora se envía el mismo mensaje pero desactivando el @everyone/@here en el caso de que no llegue a tener permisos el usuario.
        message.channel.send(args.join(" "), {
            // Si en los permisos está "MENTION_EVERYONE" entonces no desactiva el @everyone, de lo contrario sí lo hará
            disableEveryone: permisos.has("MENTION_EVERYONE") ? "none" : "none"
        });
    }
}