const Command = require("../Structures/Command.js");
const { RichEmbed } = require("discord.js")

// This command is only a experiment for comming soon integrate their in the bot

class Experiment extends Command {
  constructor(client) {
    super(client, {
      name: "experiment"
    });
  }

  async run(message, args) {

    console.log(this.user)

    let level = parseInt(args[0]) ? parseInt(args[0]) : 1;
    if (level > 5) level = 5;
    if (level < 1) level = 1;

    let possibleFigures = ["🎮", "⚽", "🏀", "⚾", "🏈", "🎾", "🎱", "🎸", "🎲", "🎳", "🎰"]
    console.log(level)
    let correctAnswer = possibleFigures.getRandom(level + 1);
    console.log(correctAnswer)

    let embed = new RichEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTitle("Memoriza los emojis y clickea en ellos")

    let msg = await message.channel.send(embed);
    let i = 0;

    let interval = setInterval(function() {
      console.log(correctAnswer[i], i)
      embed.setTitle(`Memorize: ${correctAnswer[i]}`)
      msg.edit(embed)
      i++;
      if (i >= correctAnswer.length) {
        clearInterval(interval);
        setTimeout(function() {
          embed.setTitle(`Clickea en los emojis correspondientes`)
          msg.edit(embed)
          let applied = []
          for (let it = 0; it < (possibleFigures.length - 5) + level; it++) {
            msg.react(possibleFigures[it])
            applied.push(possibleFigures[it]);
          }
          for (let ite = 0; ite < correctAnswer.length; ite++) {
            if (!applied.includes(correctAnswer[ite])) {
              msg.react(correctAnswer[ite])
            }
          }
        }, 1000);
      }
    }, 2000);

    const filter = (emojis, usuario) => (emojis.emoji.name == "🎮" || emojis.emoji.name == "⚽" || emojis.emoji.name == "🏀" || emojis.emoji.name == "⚾" || emojis.emoji.name == "🎾" || emojis.emoji.name == "🎱" || emojis.emoji.name == "🎸" || emojis.emoji.name == "🎲" || emojis.emoji.name == "🎳" || emojis.emoji.name == "🎰") && usuario.id === message.author.id;
    const collector = msg.createReactionCollector(filter, {
      time: 30000
    });

    let x = 0;
    let vidas = 2;
    let answer = "";
    let isFinish;

    collector.on("collect", async (emojis) => {
      console.log(emojis.emoji.name)
      if (!possibleFigures.includes(emojis.emoji.name)) return;
      console.log("xd");
      if (emojis.emoji.name == correctAnswer[x]) {
        answer += emojis.emoji.name;
        embed.setDescription(`${answer}`)
        msg.edit(embed)
        x++;
        if (x >= correctAnswer.length) {
          embed.setTitle("Congratulations! has resuelto esto :D")
          embed.setDescription(":tada: :tada:")
          msg.edit(embed)
          collector.stop()
        }
      } else {
        vidas--;
        if (vidas == 0) {
          embed.setTitle("Has perdido :(")
          embed.setDescription("Lose Game")
          msg.edit(embed)
          collector.stop()
        }
      }
    })

    collector.on("end", (collected) => {
      setTimeout(function() {
        message.delete()
        msg.delete()
      }, 10000);
    })

  }
}

module.exports = Experiment;