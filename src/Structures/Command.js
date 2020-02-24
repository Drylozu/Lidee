let developersIDs = ["406184197405802497", "576805413148688424"]

class Command {
  constructor(client, options) {
    this.client = client;
    this.name = options.name;
    this.aliases = options.alises || [];
    this.cooldown = options.cooldown || 0;
    this.nsfw = options.nsfw || false;
    this.devOnly = options.devOnly || false;
    this.permissions = options.permissions || [];

    this.usersCooldown = [];
  }

  configuration(options) {
    if (!options.user) return;
    let message = options.message;

    if (this.cooldown > 0) {
      this.usersCooldown.push(options.user);

      setTimeout(() => {
        this.usersCooldown.splice(this.usersCooldown.indexOf(options.user), 1);
      }, this.cooldown);
    }

    if (this.devOnly) {
      if (!developersIDs.includes(options.user)) {
        message.channel.send('You not a owner')
        throw new Error()
      }
    }

    if (this.nsfw) {
      if (!message.channel.nsfw) {
        message.channel.send('this is a NSFW command, pls use their in a nsfw channel')
        throw new Error()
      }
    }
  }

}

module.exports = Command;