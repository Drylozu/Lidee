require("../utils/prototypes")();
const { Client, Collection, MessageEmbed } = require("discord.js");
const Fortnite = require('./apis/Fortnite.js')
const LanguageManager = require("./Languages");
const nekosLife = require("nekos.life");
const KeyManager = require("./Keys");
const mongoose = require("mongoose");
const path = require("path");
const osu = require('node-osu');
const fs = require("fs");

module.exports = class Maoid extends Client {
    constructor(...args) {
        super(...args);
        this.commands = new Collection();

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

        this.languages = new LanguageManager();
        this.nekosLife = new nekosLife();
        this.fortnite = new Fortnite(process.env.fortniteToken)
        this.osu = new osu.Api(process.env.osuToken);
        this.keys = new KeyManager();

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

    log(msg, err = false, message = null) {
        if (err && err.message && err.stack) {
            let errParsed = err.stack.split("\n");
            errParsed[0] = `**${errParsed[0]}**`;
            let embed = new MessageEmbed()
                .setDescription(errParsed.join("\n> "))
                .setColor(0xff6666)
                .setTimestamp();
            if (message && message.author && message.guild) {
                embed.setFooter(`${message.guild.name} (${message.guild.id})`, message.author.displayAvatarURL())
                    .setAuthor(`${message.author.tag} (${message.author.id})`, message.guild.iconURL())
                    .addField("Message content", `\`${message.content}\``);
            }
            this.channels.resolve(this.botConfig.errorsChannel).send(embed);
        }
        console.log(`\x1b[36m[${new Date().toLocaleTimeString()}]${err ? "\x1b[31m" : "\x1b[32m"}[LOG] \x1b[0m${msg}`);
    }
}