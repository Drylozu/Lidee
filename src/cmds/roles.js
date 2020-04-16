const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Roles extends Command {
    constructor(client) {
        super(client, {
            name: "roles",
            category: 5,
            botPermissions: ["EMBED_LINKS"]
        });
    }

    run(message, args) {
        let member = message.guild.members.resolve(args[0]) || message.mentions.members.first()
        if (!member) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("rolesNo")}`)
        if (args[1] == "add") {
            let rolesArgs = args.slice(2)
            if(rolesArgs.length < 1) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("rolesRol")}`)
            for (var i = 0; i < rolesArgs.length; i++) {
                if ((rolesArgs[i].startsWith('<@') && rolesArgs[i].endsWith('>')) || !isNaN(rolesArgs[i])) {
                    rolesArgs[i] = rolesArgs[i].replace(/(\@|<|>|&)/g, "")
                    let role = message.guild.roles.cache.get(rolesArgs[i]);
                    if (!role) continue;
                    member.roles.add(role);

                    message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("rolesAdd", member.user.username, role.name)}`)
                } else {
                    let role = message.guild.roles.cache.find(r => r.name == rolesArgs.join(" "))
                    if (!role) {
                        message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("rolNotFound")}`)
                        break;
                    }
                    member.roles.add(role)
                    message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("rolesAdd", member.user.username, role.name)}`)
                    break;
                }

            }
        } else if (args[1] == 'remove') {
            let rolesArgs = args.slice(2)
            if(rolesArgs.length < 1) return message.channel.send(this.lang.get("rolesRol"))
            for (var i = 0; i < rolesArgs.length; i++) {
                if ((rolesArgs[i].startsWith('<@') && rolesArgs[i].endsWith('>')) || !isNaN(rolesArgs[i])) {
                    rolesArgs[i] = rolesArgs[i].replace(/(\@|<|>|&)/g, "")
                    let role = message.guild.roles.cache.get(rolesArgs[i]);
                    if (!role) continue;
                    member.roles.remove(role);
                    message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("rolesRemove", member.user.username, role.name)}`)
                } else {
                    let role = message.guild.roles.cache.find(r => r.name == rolesArgs.join(" "))
                    if (!role) break;
                    member.roles.remove(role)
                    message.channel.send(`${this.lang.getEmoji("okay")} ${this.lang.get("rolesRemove", member.user.username, role.name)}`)
                    break;
                }

            }
        } else {
            return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("rolesOpts")}`)
        }
    }
}