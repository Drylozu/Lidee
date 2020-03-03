const Command = require("../Structures/Command.js");
const { RichEmbed } = require("discord.js");

class Ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      category: "Moderation",
      description: "Banea a un miembro permanentemente del servidor",
      aliases: []
    });
  }

  async run(message, args) {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("<:Error:608819673336905729> » Necesitas el permiso `Banear Miembros` para ejecutar este comando");

    let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if (!member) return message.channel.send("<:Error:608819673336905729> » No se a podido encontrar la mencion de un miembro");

    if (!member.bannable) return message.channel.send("<:Error:608819673336905729> » No puedes banear a ese miembro");


    let msg = await message.channel.send(`⚠️ » Estas a punto de banear a ${member}, para confirmar reacciona en el emoji`);
    msg.react('✅')

    const filter = (emojis, usuario) => (emojis.emoji.name == "✅") && usuario.id === message.author.id;
    const collector = msg.createReactionCollector(filter, {
      time: 30000
    });

    collector.on("collect", async (emojis) => {
      if (emojis.emoji.name != "✅") return;
      message.delete()
      msg.delete()
      // member.ban(args.slice(1).join(' ').length > 0 ? args.slice(1).join(' ') : 'Razon no dada :(');
      message.channel.send(`<:Check:608819078903365662> » El miembro ${member} a sido baneado por ${message.author}`).then(m => m.delete({ timeout: 30000 }))

      this.guild.bancount++;
      this.guild.save()

      if (!this.guild.modlogs) return;
      let channel = message.guild.channels.get(this.guild.modlogs);
      if (!channel) return;

      let embed = new RichEmbed()
        .setAuthor(`${message.guild.name} » Server Ban`, message.guild.iconURL)
        .setDescription(`> Este es el baneo ${this.guild.bancount} del servidor\n
        **Miembro**: ${member.user.tag} ● ${member.user.id}
        **Moderador**: ${message.author.tag} ● ${message.author.id}

        \`Razon\`: ${args.slice(1).join(' ').length > 0 ? args.slice(1).join(' ') : 'Razon no establecida'}\n

        `)
        .setTimestamp()
        .setFooter(`${message.author.tag} - Moderador`)
        .setColor("#3A91F9")
        .setThumbnail(message.author.displayAvatarURL);

      channel.send(embed)

    });

  }

}

module.exports = Ban;