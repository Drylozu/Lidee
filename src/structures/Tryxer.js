require("../utils/prototypes.js")();
const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

module.exports = class Tryxer extends Client {
  constructor(...args) {
    super(...args);
    this.commands = new Collection();

    Object.defineProperty(this, "botConfig", { value: args[0].botConfig });
    this.ownersId = this.botConfig.ownersId.split(",");

    mongoose.connect(this.botConfig.mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err) => {
      if (err) {
        this.log("There was an error while connecting the database.");
        this.log(err.toString(), true);
        process.exit();
      } else this.log("MongoDB Ready!", true);
    });

    this.db = require("../utils/database.js");

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

  log(msg, err = false) {
    console.log(`\x1b[36m[${new Date().toLocaleTimeString()}]${err ? "\x1b[31m" : "\x1b[32m"}[LOG] \x1b[0m${msg}`);
  }
}
