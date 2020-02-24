const Command = require("../Structures/Command.js");

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      devOnly: true,
      cooldown: 1000
    });
  }

  run(message, args) {
    if (!["576805413148688424", "406184197405802497"].includes(message.author.id)) return message.channel.send('Only Developers!');

    let limit = 1950;
    try {
      let code = args.join(' ');
      let evalued = eval(code);
      if (typeof evalued !== "string")
        evalued = require("util").inspect(evalued);
      let txt = "" + evalued;
      if (txt.length > limit) {
        message.channel.send(`\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``);
      } else
        message.channel.send(`\`\`\`js\n ${txt}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
    }
  }
}

module.exports = Eval;