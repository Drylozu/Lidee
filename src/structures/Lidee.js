require("../utils/prototypes")();
const { Client, MessageEmbed } = require("discord.js");
const LanguageManager = require("../managers/Languages");
const CommandsManager = require("../managers/Commands");
const APIManager = require("../managers/APIs");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

module.exports = class Maoid extends Client {
    constructor(...args) {
        super(...args);

        Object.defineProperty(this, "botConfig", { value: args[0].botConfig });

        mongoose.connect(this.botConfig.mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                this.log("There was an error while connecting the database.", true);
                this.log(err.toString(), true);
                process.exit();
            } else this.log("MongoDB Ready!");
        });

        this.db = require("../utils/databases");

        this.commands = new CommandsManager(this);
        this.languages = new LanguageManager();
        this.apis = new APIManager();

        this.loadEvents();

        this.login(this.botConfig.token);
    }

    loadEvents() {
        for (let file of fs.readdirSync(path.join(__dirname, "../events/"))) {
            let event = new (require(`../events/${file}`))(this);
            this.on(file.split(".")[0], (...args) => event.run(...args));
        }
    }

    log(msg, err = false, message = null) {
        if (err && err.message && err.stack) {
            let errParsed = err.stack.split("\n");
            errParsed[0] = `**${errParsed[0]}**`;
            let embed = new MessageEmbed()
                .setDescription(errParsed.join("\n> "))
                .setColor(0xff6666)
                .setTimestamp();
            if (message && message.author && message.guild) {
                embed.setFooter(`${message.guild.name} (${message.guild.id} - ${this.shard.ids.join("-")})`, message.guild.iconURL())
                    .setAuthor(`${message.author.tag} (${message.author.id})`, message.guild.displayAvatarURL())
                    .addField("Message content", `\`${message.content}\``);
            }
            this.channels.resolve(this.botConfig.errorsChannel).send(embed);
        }
        console.log(`\x1b[36m[${new Date().toLocaleTimeString()}]\x1b[33m[S${this.shard.ids.join("-")}]${err ? "\x1b[31m" : "\x1b[32m"}[LOG] \x1b[0m${msg}`);
    }
}