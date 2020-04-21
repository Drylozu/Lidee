const Command = require("../structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Ping extends Command {
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
                    .addField(this.lang.get("covidToday"), Global.NewConfirmed.toLocaleString(), true)
                    .addField(this.lang.get("covidTodayRecovered"), Global.NewRecovered.toLocaleString(), true)
                    .addField(this.lang.get("covidTodayDeaths"), Global.NewDeaths.toLocaleString(), true)
                    .addField(this.lang.get("covidTotal"), Global.TotalConfirmed.toLocaleString(), true)
                    .addField(this.lang.get("covidTotalRecovered"), Global.TotalRecovered.toLocaleString(), true)
                    .addField(this.lang.get("covidTotalDeaths"), Global.TotalDeaths.toLocaleString(), true)
                    .setColor(0x6666ff)
                    .setTimestamp());
            else {
                let covidCountry = Countries.find((c) => c.Country.toLowerCase() === country.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
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
        } catch (e) {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("covidError")}`);
        }
    }
}