const { Client, Collection } = require("discord.js");
const path = require("path");
const fs = require("fs");

class Tryxer extends Client {
  constructor(...args) {
    super(...args);
    this.commands = new Collection();

    Object.defineProperty(this, "botConfig", { value: args[0].botConfig });

    this.loadCommands();
    this.loadEvents();

    this.login(this.botConfig.token);
  }

  loadEvents() {
    for (let file of fs.readdirSync(path.join(__dirname, "../events/"))) {
      let event = new(require(`../events/${file}`))(this);
      this.on(file.split(".")[0], (...args) => event.run(...args));
    }
  }

  loadCommands() {
    for (let file of fs.readdirSync(path.join(__dirname, "../cmds/"))) {
      let command = new(require(`../cmds/${file}`))(this);
      this.commands.set(command.name, command);
    }
  }

  log(msg, e = false) {
    console.log(`\x1b[36m[${new Date().toLocaleTimeString()}]${e ? "\x1b[31m" : "\x1b[32m"}[LOG] \x1b[0m${msg}`);
  }
}

// Prototypes
Array.prototype.getRandom = function(num = false) {
  if (!num) return this[Math.floor(Math.random() * this.length)];
  let elements = []
  for (let i = 0; i < num; i++) {
    elements.push(this[Math.floor(Math.random() * this.length)])
  }
  return elements;
};

module.exports = Tryxer;