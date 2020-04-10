const { MessageEmbed } = require("discord.js");
const Command = require("../structures/Command");

module.exports = class Fortnite extends Command {
    constructor(client) {
        super(client, {
            name: "fortnite",
            aliases: [],
            category: 1
        });
    }

    async run(message, args) {

        if (!args[0]) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("fortniteUser")}`);

        if (args[0] == 'tienda') {
            let store = await this.client.fortnite.dailyShop('es')
            if (!args[1] || isNaN(args[1]) || args[1] > store.daily.length) args[1] = 1;

            message.channel.send(new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle('Fortnite Daily Store')
                .addField(`${store.daily[args[1] - 1].name} | ${store.daily[args[1] - 1].id}`, `**Description**: ${store.daily[args[1] - 1].description}
                **Type**: ${store.daily[args[1] - 1].type}
                **Rarity**: ${store.daily[args[1] - 1].rarity}
                **Price**: ${store.daily[args[1] - 1].price} V-Bucks`)
                .setImage(store.daily[args[1] - 1].full_background)
                .setFooter(`Page ${args[1]}/${store.daily.length}`)
                .setColor(0x6666ff)
                .setTimestamp());
        } else {
            let user = await this.client.fortnite.userStats(args[0]);
            const embed = new MessageEmbed()
                .setAuthor(this.lang.get("fortniteStats", user.name, user.account.level), message.author.displayAvatarURL())
                .setColor(0x4c51f7)
                .setTimestamp()
                .addField(`${this.lang.get("fortniteSingle")}`, `**${this.lang.get("fortniteWinrate")}**: ${user.global_stats.solo.winrate}
                **${this.lang.get("fortniteKD")}**: ${user.global_stats.solo.kd}
                **${this.lang.get("fortniteKills")}**: ${user.global_stats.solo.kills}
                **${this.lang.get("fortniteTotalMins")}**: ${user.global_stats.solo.minutesplayed}
                **${this.lang.get("fortniteTotalsMatchs")}**: ${user.global_stats.solo.matchesplayed}`, true)
                .addField(`${this.lang.get("fortniteDouble")}`, `**${this.lang.get("fortniteWinrate")}**: ${user.global_stats.duo.winrate}
                **${this.lang.get("fortniteKD")}**: ${user.global_stats.duo.kd}
                **${this.lang.get("fortniteKills")}**: ${user.global_stats.duo.kills}
                **${this.lang.get("fortniteTotalMins")}**: ${user.global_stats.duo.minutesplayed}
                **${this.lang.get("fortniteTotalsMatchs")}**: ${user.global_stats.duo.matchesplayed}`, true)
                .addField(`${this.lang.get("fortniteSquad")}`, `**${this.lang.get("fortniteWinrate")}**: ${user.global_stats.squad.winrate}
                **${this.lang.get("fortniteKD")}**: ${user.global_stats.squad.kd}
                **${this.lang.get("fortniteKills")}**: ${user.global_stats.squad.kills}
                **${this.lang.get("fortniteTotalMins")}**: ${user.global_stats.squad.minutesplayed}
                **${this.lang.get("fortniteTotalsMatchs")}**: ${user.global_stats.squad.matchesplayed}`, true)
            message.channel.send(embed)
        }
    }
}