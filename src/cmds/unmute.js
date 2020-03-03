const Command = require("../Structures/Command.js");

class Mute extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      category: "Moderation",
      description: "Silencia a un miembro del servidor"
    });
  }

  async run(message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<:Error:608819673336905729> » Necesitas el permiso `Administrar Cargos` para ejecutar este comando");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("<:Error:608819673336905729> » Requiero el permiso `Administrar Cargos` para ejcutar el comando");

    let member = message.guild.members.get(args[0]) || message.mentions.members.first();
    if (!member) return message.channel.send("<:Error:608819673336905729> » No se a podido encontrar la mencion de un miembro");

    let role = message.guild.roles.find(r => r.name === "🚫 Muted Member");
    if (!role) {

      role = await message.guild.createRole({
        name: "🚫 Muted Member",
        color: "#EE154D",
        position: message.guild.me.roles.find((r) => r.managed).calculatedPosition - 1,
        permissions: 0
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });

    }

    if (member.roles.has(role.id)) return message.channel.send("<:Error:608819673336905729> » Este miembro ya esta silenciado");
    if (!this.guild.mutedmembers.includes(member.id)) this.guild.mutedmembers.push(member.id);
    member.addRole(role.id);
    message.channel.send(`<:Check:608819078903365662> » El miembro ${member} a sido silenciado permanente mente`)

  }

}

module.exports = Mute;