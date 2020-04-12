const { MessageEmbed } = require("discord.js");
const Command = require("../structures/Command");

module.exports = class Osu extends Command {
    constructor(client) {
        super(client, {
            name: "osu",
            aliases: [],
            category: 1
        });
    }

    async run(message, [mode, username]) {
        if (!mode) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("osuNoMode")}`);
        let modes = ["normal", "taiko", "catch", "mania"];
        let modeNumber = modes.indexOf(mode.toLowerCase());
        if (modeNumber < 0) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("osuNoMode")}`);
        if (!username) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("osuNoUser")}`);
        let [user] = await this.client.apis.osu.getUser(username, modeNumber);
        if (!user) return message.channel.send(`${this.lang.getEmoji("error")} ${this.lang.get("osuNoUser")}`);
        console.log(user);
        let embed = new MessageEmbed()
            .setAuthor(this.lang.get("osuStats", user.username, mode.toLowerCase()), `https://a.ppy.sh/${user.user_id}`)
            .setDescription(`**${this.lang.get("osuCountry")}**: :flag_${user.country.toLowerCase()}: ${user.country}${user.level ? `\n**${this.lang.get("osuLevel")}**: ${parseInt(user.level)}` : ""}${user.pp_raw ? `\n**${this.lang.get("osuPP")}**: ${parseInt(user.pp_raw)}` : ""}${user.accuracy ? `\n**${this.lang.get("osuAccuracy")}**: ${Number(user.accuracy).toFixed(1)}%` : ""}${user.total_score ? `\n**${this.lang.get("osuTotalScore")}**: ${user.total_score}` : ""}`)
        if (user.count_rank_ss && user.count_rank_ssh && user.count_rank_s && user.count_rank_sh && user.count_rank_a)
            embed.addField(this.lang.get("osuScores"), `**SS**: ${user.count_rank_ss}  **SSH**: ${user.count_rank_ssh}  **S**: ${user.count_rank_s}  **SH**: ${user.count_rank_sh}  **A**: ${user.count_rank_a}`);
        embed.setFooter(this.lang.get("id", user.user_id))
            .setColor(0xff66ff)
            .setTimestamp();

        message.channel.send(embed);
    }
}