const Command = require("../Structures/Command.js");
const { RichEmbed } = require('discord.js')

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help"
    });
  }

  async run(message) {

    let index = new RichEmbed()
      .setTitle('<:discord:682794186877173774> | Tryxer » Página Inicial')
      .setDescription(`Reacciona en su respectivo emoji para ver los comandos de la categoria

        <:moderation:682792050101453088> » Moderacion
        <:prototype:683123994265780285> » Prototype`)

    let moderation = new RichEmbed()
      .setTitle('<:discord:682794186877173774> | Tryxer » Moderacion')
      .setDescription(`A continuacion se les mostrara los comandos de Moderacion

            ${this.client.commands.filter((c) => c.category == 'Moderation').map(x => `${this.guild.prefix}${x.name} » ${x.description}`)}`)

    let prototype = new RichEmbed()
      .setTitle('<:discord:682794186877173774> | Tryxer » Prototype')
      .setDescription(`los comandos que se encuentran aca estan actualmente en desarollo y no estan completos asi que puede haber errores en su ejecucion.

            ${this.client.commands.filter((c) => c.category == 'Prototype').map(x => `${this.guild.prefix}${x.name} » ${x.description}`)}`)

    let msg = await message.channel.send(index)

    const filter = (emojis, usuario) => (emojis.emoji.id == "682792050101453088" || emojis.emoji.id == "683123994265780285") && usuario.id === message.author.id;
    const collector = msg.createReactionCollector(filter, {
      time: 1000000
    });
    collector.on("collect", (emojis) => {
      if (emojis.emoji.id == "682792050101453088") {
        msg.edit(moderation)
        emojis.remove(message.author.id);
      };
      if (emojis.emoji.id == "683123994265780285") {
        msg.edit(prototype)
        emojis.remove(message.author.id);
      }
    });

    await msg.react("682792050101453088"); // Staff Emoji
    await msg.react("683123994265780285"); // Prototype Emoji


  }

}

module.exports = Help;