const Guild = require('../models/guild.js');
const User = require('../models/user.js')

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.content.startsWith(this.client.botConfig.prefix)) return;
    let args = message.content.slice(this.client.botConfig.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let err = false;

    try {
      let cmdFile = this.client.commands.find((c) => c.name === cmd || c.aliases.includes(cmd));
      if (!cmdFile) return;
      if (cmdFile.usersCooldown.includes(message.author.id)) return message.channel.send('Ya veremos que poner aca');
      cmdFile.prepare({ guild: await Guild.findOne({ id: message.guild.id }).exec(), user: await User.findOne({ id: message.author.id }).exec() })
      cmdFile.configuration({ user: message.author.id, message });
      cmdFile.run(message, args);
    } catch (e) {
      err = true;
      this.client.log(e.toString(), true);
    } finally {
      this.client.log(`${message.author.tag} ran the command ${cmd} in ${message.guild.name}`, err);
    }
  }
}