const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");
const phin = require("phin");

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "covid19",
            aliases: ["covid", "coronavirus"],
            category: 1,
            botPermissions: ["EMBED_LINKS"]
        });
    }

    async run(message, [country]) {
        let { body: { AllUpdated } } = await phin({
            url: "https://api.covid19api.com/stats",
            parse: "json"
        });
        let { body: { Global, Countries } } = await phin({
            url: "https://api.covid19api.com/summary",
            parse: "json"
        });
        if (!country || !Countries.find((c) => c.Country.toLowerCase() === country.toLowerCase()))
            message.channel.send(new MessageEmbed()
                .setAuthor(this.lang.get("covidStatsGlobal"), message.author.displayAvatarURL())
                .setDescription(`**${this.lang.get("covidLastUpdate")}**:\n${this.lang.parseCompleteDate(new Date(AllUpdated))}`)
                .addField(this.lang.get("covidToday"), Global.NewConfirmed.toLocaleString(), true)
                .addField(this.lang.get("covidTodayRecovered"), Global.NewRecovered.toLocaleString(), true)
                .addField(this.lang.get("covidTodayDeaths"), Global.NewDeaths.toLocaleString(), true)
                .addField(this.lang.get("covidTotal"), Global.TotalConfirmed.toLocaleString(), true)
                .addField(this.lang.get("covidTotalRecovered"), Global.TotalRecovered.toLocaleString(), true)
                .addField(this.lang.get("covidTotalDeaths"), Global.TotalDeaths.toLocaleString(), true)
                .setColor(0x6666ff)
                .setTimestamp());
        else {
            let covidCountry = Countries.find((c) => c.Country.toLowerCase() === country.toLowerCase());
            message.channel.send(new MessageEmbed()
                .setAuthor(this.lang.get("covidStatsCountry", covidCountry.Country), message.author.displayAvatarURL())
                .setDescription(`**${this.lang.get("covidLastUpdate")}**:\n${this.lang.parseCompleteDate(new Date(covidCountry.Date))}`)
                .addField(this.lang.get("covidToday"), covidCountry.NewConfirmed.toLocaleString(), true)
                .addField(this.lang.get("covidTodayRecovered"), covidCountry.NewRecovered.toLocaleString(), true)
                .addField(this.lang.get("covidTodayDeaths"), covidCountry.NewDeaths.toLocaleString(), true)
                .addField(this.lang.get("covidTotal"), covidCountry.TotalConfirmed.toLocaleString(), true)
                .addField(this.lang.get("covidTotalRecovered"), covidCountry.TotalRecovered.toLocaleString(), true)
                .addField(this.lang.get("covidTotalDeaths"), covidCountry.TotalDeaths.toLocaleString(), true)
                .setColor(0x6666ff)
                .setTimestamp());
        }
    }
}