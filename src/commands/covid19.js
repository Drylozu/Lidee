const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class COVID19 extends Command {
    constructor(client) {
        super(client, {
            name: "covid19",
            aliases: ["covid", "coronavirus"],
            category: 1,
            botPermissions: ["channel", "EMBED_LINKS"]
        });
    }

    async run(message, args) {
        let country = args.join(" ");
        try {
            let AllUpdated = await this.client.apis.covid.getAllLastUpdate();
            let { Global, Countries } = await this.client.apis.covid.getAllStats();
            if (!country || !Countries.find((c) => c.Country.toLowerCase().includes(country.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())))
                message.channel.send(new MessageEmbed()
                    .setAuthor(this.lang.get("covidStatsGlobal"), message.author.displayAvatarURL())
                    .setDescription(`**${this.lang.get("covidLastUpdate")}**:\n${this.lang.parseCompleteDate(new Date(AllUpdated))}`)
                    .addField(this.lang.get("covidCases"), `**${Global.TotalConfirmed.toLocaleString()}** (+${Global.NewConfirmed.toLocaleString()})`, true)
                    .addField(this.lang.get("covidRecovered"), `**${Global.TotalRecovered.toLocaleString()}** (+${Global.NewRecovered.toLocaleString()})`, true)
                    .addField(this.lang.get("covidDeaths"), `**${Global.TotalDeaths.toLocaleString()}** (+${Global.NewDeaths.toLocaleString()})`, true)
                    .setColor(0x6666ff)
                    .setTimestamp());
            else {
                let covidCountry = Countries.find((c) => c.Country.toLowerCase().includes(country.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()));
                message.channel.send(new MessageEmbed()
                    .setAuthor(this.lang.get("covidStatsCountry", covidCountry.Country), message.author.displayAvatarURL())
                    .setDescription(`**${this.lang.get("covidLastUpdate")}**:\n${this.lang.parseCompleteDate(new Date(covidCountry.Date))}`)
                    .addField(this.lang.get("covidCases"), `**${covidCountry.TotalConfirmed.toLocaleString()}** (+${covidCountry.NewConfirmed.toLocaleString()})`, true)
                    .addField(this.lang.get("covidRecovered"), `**${covidCountry.TotalRecovered.toLocaleString()}** (+${covidCountry.NewRecovered.toLocaleString()})`, true)
                    .addField(this.lang.get("covidDeaths"), `**${covidCountry.TotalDeaths.toLocaleString()}** (+${covidCountry.NewDeaths.toLocaleString()})`, true)
                    .setColor(0x6666ff)
                    .setTimestamp());
            }
        } catch (e) {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("covidError")}`);
        }
    }
}