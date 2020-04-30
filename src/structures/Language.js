const { Permissions } = require("discord.js");

module.exports = class Language {
    constructor({ strings, constants, help }) {
        Object.defineProperty(this, "strings", { value: strings });
        Object.defineProperty(this, "constants", { value: constants });
        Object.defineProperty(this, "help", { value: help });

        this.emojis = {
            serverVerified: "<:ServerVerified:697135843923591289>",
            notifyMessages: "<:NotifyMessages:696963136929923083>",
            notifyMentions: "<:NotifyMentions:696963830097641563>",
            userTranslator: "<:UserTranslator:697522235401043969>",
            serverPartner: "<:ServerPartner:697135845647581235>",
            userBugHunter: "<:UserBugHunter:697872203080794234>",
            serverPremium: "<:ServerPremium:697522233513345126>",
            serverBoosted: "<:ServerBoosted:690932026987249685>",
            userDeveloper: "<:UserDeveloper:697522234490749008>",
            voiceChannel: "<:VoiceChannel:696937224041660641>",
            richPresence: "<:RichPresence:697135842652586024>",
            userBooster: "<a:UserBooster:690932040152907856>",
            userDonator: "<:UserDonator:697522235044397076>",
            serverMfa: "<:2FAModeration:696972838598344794>",
            userOwner: "<:UserOwner:697135843210690571>",
            inviteBot: "<:InviteBot:697944472868356136>",
            voteBot: "<:VoteBot:697947690394189945>",
            userBot: "<:UserBot:690932029214162975>",
            error: "<:Error:690932023325491240>",
            okay: "<:Okay:690932026697711616>",
            serverBoosts: [
                "<:0Boost:697135839624560671>",
                "<:1Boost:697135840362496020>",
                "<:2Boost:697135840828325998>",
                "<:3Boost:697135841566523443>"
            ],

            statusMobile: {
                online: "<:MobileOnline:697135842346532935>",
                idle: "<:MobileIdle:697135841973370921>",
                dnd: "<:MobileDnd:697135841474117695>"
            },
            userFlags: {
                HOUSE_BRILLIANCE: "<:HypeSquadBrilliance:704769227290181735>",
                VERIFIED_DEVELOPER: "<:VerifiedDeveloper:704769227478794260>",
                HYPESQUAD_EVENTS: "<:HypeSquadEvents:704769227273535519>",
                DISCORD_EMPLOYEE: "<:DiscordEmployee:704769219945824416>",
                HOUSE_BRAVERY: "<:HypeSquadBravery:704769227349033071>",
                HOUSE_BALANCE: "<:HypeSquadBalance:704769226531143691>",
                EARLY_SUPPORTER: "<:EarlySupporter:704769224207237202>",
                BUGHUNTER_LEVEL_1: "<:BugHunter2:704769216796164237>",
                BUGHUNTER_LEVEL_2: "<:BugHunter1:704769215881805866>",
                DISCORD_PARTNER: "<:UserPartner:704769227332255774>",
                DISCORD_NITRO: "<:DiscordNitro:705459275413323877>",
                VERIFIED_BOT: "<:BotVerified:704769185254735893>"
            },
            status: {
                offline: "<a:UInvisible:690932032187924500>",
                online: "<a:UOnline:690932032812875876>",
                idle: "<a:UIdle:690932032485982238>",
                dnd: "<a:UDnd:690932031705579551>"
            }
        };
    }

    get(string, ...args) {
        let value = this.strings[string];
        if (typeof value === "function")
            return value(...args);
        else
            return value;
    }

    getConstant(category, property, ...args) {
        let object = this.constants[category];
        if (typeof object === "object" && !(object instanceof Array)) {
            let value = object[property];
            if (typeof value === "function")
                return value(...args);
            else
                return value;
        } else if (typeof object === "function")
            return object(...args);
        else
            return object;
    }

    getHelp(string, ...args) {
        let value = this.help[string];
        if (typeof value === "function")
            return value(...args);
        else
            return value;
    }

    getEmoji(name) {
        return this.emojis[name];
    }

    parsePermissions(permissions) {
        if (permissions.includes("ADMINISTRATOR"))
            return `\`\`\`fix\n+ ${this.getConstant("permissions", "ADMINISTRATOR").firstUpperCase()}\n\`\`\``;
        let output = "";
        let defaultPermissions = new Permissions(Permissions.DEFAULT).toArray();
        permissions
            .filter((p) => !defaultPermissions.includes(p)).sort()
            .forEach((permission) => {
                output += `+ ${this.getConstant("permissions", permission).firstUpperCase()}\n`;
            });
        output += `--- ${this.getConstant("permissions", "default").firstUpperCase()}\n`;
        defaultPermissions
            .filter((dP) => !permissions.includes(dP)).sort()
            .forEach((permission) => {
                output += `- ${this.getConstant("permissions", permission).firstUpperCase()}\n`;
            });
        return `\`\`\`diff\n${output}\n\`\`\``;
    }

    parseCompleteDate(date) {
        let old = true;
        if (date.getTime() > new Date().getTime())
            old = false;
        let milliseconds = old ? new Date() - date : date - new Date();
        let timeObj = {
            years: Math.floor(milliseconds / 3.154e+10),
            months: Math.floor(milliseconds / 2.628e+9) % 12,
            weeks: Math.floor(milliseconds / 6.048e+8) % 4,
            days: Math.floor(milliseconds / 86400000) % 7,
            hours: Math.floor(milliseconds / 3600000) % 24,
            minutes: Math.floor(milliseconds / 60000) % 60,
            seconds: Math.floor(milliseconds / 1000) % 60,
            milliseconds: Math.floor(milliseconds) % 1000,
            microseconds: Math.floor(milliseconds * 1000) % 1000,
            nanoseconds: Math.floor(milliseconds * 1e6) % 1000
        };

        let time = [
            timeObj.years ? this.getConstant("time", `year${timeObj.years > 1 ? "s" : ""}`, timeObj.years) : "",
            timeObj.months ? this.getConstant("time", `month${timeObj.months > 1 ? "s" : ""}`, timeObj.months) : "",
            timeObj.weeks ? this.getConstant("time", `week${timeObj.weeks > 1 ? "s" : ""}`, timeObj.weeks) : "",
            timeObj.days ? this.getConstant("time", `day${timeObj.days > 1 ? "s" : ""}`, timeObj.days) : "",
            timeObj.hours ? this.getConstant("time", `hour${timeObj.hours > 1 ? "s" : ""}`, timeObj.hours) : "",
            timeObj.minutes ? this.getConstant("time", `minute${timeObj.minutes > 1 ? "s" : ""}`, timeObj.minutes) : "",
            timeObj.seconds ? this.getConstant("time", `second${timeObj.seconds > 1 ? "s" : ""}`, timeObj.seconds) : ""
        ];

        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()} (${time.filter((u) => u !== "").length < 1 ? this.getConstant("time", "now") : this.getConstant("time", old ? "ago" : "within", time.filter((u) => u !== "").slice(0, 4).join(", "))})`;
    }

    parseTime(milliseconds) {
        let timeObj = {
            years: Math.floor(milliseconds / 3.154e+10),
            months: Math.floor(milliseconds / 2.628e+9) % 12,
            weeks: Math.floor(milliseconds / 6.048e+8) % 4,
            days: Math.floor(milliseconds / 86400000) % 7,
            hours: Math.floor(milliseconds / 3600000) % 24,
            minutes: Math.floor(milliseconds / 60000) % 60,
            seconds: Math.floor(milliseconds / 1000) % 60,
            milliseconds: Math.floor(milliseconds) % 1000,
            microseconds: Math.floor(milliseconds * 1000) % 1000,
            nanoseconds: Math.floor(milliseconds * 1e6) % 1000
        };

        return [
            timeObj.hours ? `${String(timeObj.hours).length < 2 ? "0" : ""}${timeObj.hours}` : "00",
            timeObj.minutes ? `${String(timeObj.minutes).length < 2 ? "0" : ""}${timeObj.minutes}` : "00",
            timeObj.seconds ? `${String(timeObj.seconds).length < 2 ? "0" : ""}${timeObj.seconds}` : "00"
        ].join(":");
    }

    parseMemberRoles(memberRoles) {
        let everyoneRole = memberRoles.guild.roles.everyone;
        let hoistRole = memberRoles.hoist;
        let rolesParsed = memberRoles.cache
            .filter((r) => r.id !== everyoneRole.id)
            .sort((a, b) => b.position - a.position)
            .map((r) => (r.id === hoistRole.id ? `__<@&${r.id}>__` : `<@&${r.id}>`))
            .slice(0, 15);
        if (rolesParsed.length < 1) return this.get("nothing");
        return rolesParsed.length > 15 ? `${rolesParsed.join(", ")} ${this.get("others", rolesParsed.length - 15)}` : rolesParsed.join(", ");
    }

    parseMemberActivity(activities, client) {
        let customStatus = activities.find((a) => a.type === "CUSTOM_STATUS");
        let principalActivity =
            activities.find((a) => a.type === "LISTENING" && (a.state && a.details)) ||
            activities.find((a) => a.state && a.details) ||
            activities.find((a) => a.type !== "CUSTOM_STATUS");
        let statusEmojiGuild = customStatus && customStatus.emoji
            && customStatus.emoji.id ? client.emojis.resolve(customStatus.emoji.id) : false;
        
        return [
            customStatus && ((customStatus.emoji && !principalActivity) || customStatus.state) ? `**${this.getConstant("activities", "CUSTOM_STATUS")}**: ${customStatus.emoji ? `*${statusEmojiGuild ? customStatus.emoji.toString() : customStatus.emoji.name}* ` : ""}${customStatus.state ? customStatus.state : ""}\n\n` : "",
            principalActivity && principalActivity.name ? `${customStatus && customStatus.emoji && !customStatus.state
                ? `*${statusEmojiGuild ? customStatus.emoji.toString() : customStatus.emoji.name}* ` : ""}${this.getConstant("activities", principalActivity.type)} **${principalActivity.name}**.${principalActivity.state && principalActivity.details ? this.getEmoji("richPresence") : ""}\n` : "",
            principalActivity && principalActivity.details ? `**•** ${principalActivity.details}\n` : "",
            principalActivity && principalActivity.state ? `**•** ${principalActivity.state}\n` : "",
            principalActivity && principalActivity.timestamps && principalActivity.timestamps.start ? this.getConstant("time",
                principalActivity.timestamps.end
                    ? "left" : "elapsed",
                this.parseTime(principalActivity.timestamps.end
                    ? principalActivity.timestamps.end - Date.now()
                    : Date.now() - principalActivity.timestamps.start)
            ) : ""
        ].filter((o) => o !== "").join("");
    }

    parseServerRoles(serverRoles) {
        let everyoneRole = serverRoles.guild.roles.everyone;
        let rolesParsed = serverRoles.cache
            .filter((r) => r.id !== everyoneRole.id)
            .sort((a, b) => b.position - a.position)
            .map((r) => `<@&${r.id}>`);
        if (rolesParsed.length < 1) return this.get("nothing");
        return rolesParsed.length > 25 ? `${rolesParsed.slice(0, 25).join(", ")} ${this.get("others", rolesParsed.length - 25)}` : rolesParsed.slice(0, 25).join(", ");
    }

    parseServerEmojis(serverEmojis) {
        let normalEmojis = serverEmojis.cache
            .filter((e) => !e.animated)
            .map((e) => `<:${e.name}:${e.id}>`);
        let animatedEmojis = serverEmojis.cache
            .filter((e) => e.animated)
            .map((e) => `<a:${e.name}:${e.id}>`);
        if (normalEmojis.size < 1)
            normalEmojis = [this.get("nothing")];
        if (animatedEmojis.size < 1)
            animatedEmojis = [this.get("nothing")];

        let normalEmojisOut = [];
        let animatedEmojisOut = [];
        for (let emoji of normalEmojis) {
            if ((normalEmojisOut.join(" ").length + emoji.length) > 474) {
                normalEmojisOut.push(this.get("others", normalEmojis.length - normalEmojisOut.length));
                break;
            }
            normalEmojisOut.push(emoji);
        }
        for (let emoji of animatedEmojis) {
            if ((animatedEmojisOut.join(" ").length + emoji.length) > 474) {
                animatedEmojisOut.push(this.get("others", normalEmojis.length - animatedEmojisOut.length));
                break;
            }
            animatedEmojisOut.push(emoji);
        }

        return `**${this.get("serverEmojisNormal")}**:\n> ${normalEmojisOut.join(" ")}\n**${this.get("serverEmojisAnimated")}**:\n> ${animatedEmojisOut.join(" ")}`;
    }

    parseServerFeatures(features) {
        return features.filter((f) => f !== "FEATURABLE").map((f) => this.getConstant("serverFeatures", f)).join(", ").firstUpperCase();
    }
}