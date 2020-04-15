const { MessageEmbed } = require("discord.js");
const Command = require("../structures/Command");

module.exports = class Fortnite extends Command {
    constructor(client) {
        super(client, {
            name: "fortnite",
            category: 1
        });
    }

    async run(message, [arg, page]) {
        if (!arg) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("fortniteNo")}`);
        else if (arg === "shop") {
            let shop = await this.client.apis.fortnite.getDailyShop(this.lang.languageCode === "pt" ? "pt-BR" : this.lang.languageCode);
            let item = isNaN(page) || parseInt(page) < 1 || parseInt(page) > shop.length
                ? 1 : parseInt(page);
            let shopItem = shop[parseInt(item) - 1];
            message.channel.send(new MessageEmbed()
                .setAuthor(this.lang.get("fortniteShop"), message.author.displayAvatarURL())
                .addField(shopItem.name, `**${this.lang.get("fortniteShopDescription")}**: ${shopItem.description}\n**${this.lang.get("fortniteShopType")}**: ${shopItem.type}.\n**${this.lang.get("fortniteShopRarity")}**: ${shopItem.rarity}.\n**${this.lang.get("fortniteShopPrice")}**: ${shopItem.price} ${this.lang.get("fortniteShopCurrency")}.`)
                .setImage(shopItem.full_background)
                .setFooter(this.lang.get("fortniteShopItem", item, shop.length))
                .setColor(0x6666ff)
                .setTimestamp());
        } else try {
            let user = await this.client.apis.fortnite.getUserStats(arg);
            if (user.error || !user.global_stats) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("fortniteNoUser")}`);
            let embed = new MessageEmbed()
                .setAuthor(this.lang.get("fortniteUserStats", user.name, user.account.level ? user.account.level : 0), message.author.displayAvatarURL())
                .setDescription(this.lang.get("id", user.id));
            if (user.global_stats.solo)
                embed.addField(this.lang.get("fortniteUserSolo"), `**${this.lang.get("fortniteUserWinrate")}**:\n${user.global_stats.solo.winrate.toLocaleString()}\n**${this.lang.get("fortniteUserKD")}**:\n${user.global_stats.solo.kd.toLocaleString()}\n**${this.lang.get("fortniteUserKills")}**:\n${user.global_stats.solo.kills.toLocaleString()}\n**${this.lang.get("fortniteUserMinutes")}**:\n${user.global_stats.solo.minutesplayed.toLocaleString()}\n**${this.lang.get("fortniteUserMatchs")}**:\n${user.global_stats.solo.matchesplayed.toLocaleString()}`, true);
            if (user.global_stats.duo)
                embed.addField(this.lang.get("fortniteUserDuo"), `**${this.lang.get("fortniteUserWinrate")}**:\n${user.global_stats.duo.winrate.toLocaleString()}\n**${this.lang.get("fortniteUserKD")}**:\n${user.global_stats.duo.kd.toLocaleString()}\n**${this.lang.get("fortniteUserKills")}**:\n${user.global_stats.duo.kills.toLocaleString()}\n**${this.lang.get("fortniteUserMinutes")}**:\n${user.global_stats.duo.minutesplayed.toLocaleString()}\n**${this.lang.get("fortniteUserMatchs")}**:\n${user.global_stats.duo.matchesplayed.toLocaleString()}`, true);
            if (user.global_stats.squad)
                embed.addField(this.lang.get("fortniteUserSquad"), `**${this.lang.get("fortniteUserWinrate")}**:\n${user.global_stats.squad.winrate.toLocaleString()}\n**${this.lang.get("fortniteUserKD")}**:\n${user.global_stats.squad.kd.toLocaleString()}\n**${this.lang.get("fortniteUserKills")}**:\n${user.global_stats.squad.kills.toLocaleString()}\n**${this.lang.get("fortniteUserMinutes")}**:\n${user.global_stats.squad.minutesplayed.toLocaleString()}\n**${this.lang.get("fortniteUserMatchs")}**:\n${user.global_stats.squad.matchesplayed.toLocaleString()}`, true);
            embed.setColor(0x6666ff)
                .setTimestamp();
            message.channel.send(embed);
        } catch (e) {
            this.client.log(e.toString(), e, message);
            message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("fortniteError")}`)
        }
    }
}