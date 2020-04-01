const { Permissions } = require("discord.js");

module.exports = class Language {
    constructor(strings, constants, help, time) {
        Object.defineProperty(this, "strings", { value: strings });
        Object.defineProperty(this, "constants", { value: constants });
        Object.defineProperty(this, "help", { value: help });
        Object.defineProperty(this, "time", { value: time })

        this.emojis = {
            serverPartnered: "<:ServerPartnered:690932029797302363>",
            serverVerified: "<:ServerVerified:690932030464065580>",
            serverBoosted: "<:ServerBoosted:690932026987249685>",
            richPresence: "<:RichPresence:690932026290995253>",
            userBooster: "<a:UserBooster:690932040152907856>",
            userOwner: "<:UserOwner:690932030145429504>",
            userBot: "<:UserBot:690932029214162975>",
            statusMobile: {
                online: "<:SOnline:690932028908109874>",
                idle: "<:SIdle:690932031215108106>",
                dnd: "<:SDnd:690932026844643398>"
            },
            status: {
                invisible: "<a:UInvisible:690932032187924500>",
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
        if (typeof object === "object") {
            let value = object[property];
            if (typeof value === "function")
                return value(...args);
            else
                return value;
        } else
            return object;
    }

    getHelp(string, ...args) {
        let value = this.help[string];
        if (typeof value === "function")
            return value(...args);
        else
            return value;
    }

    getTime(string, ...args) {
        let value = this.time[string];
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

    parseMiliseconds(milliseconds) {
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
            timeObj.years ? this.getTime(`year${timeObj.years > 1 ? "s" : ""}`, timeObj.years) : "",
            timeObj.months ? this.getTime(`month${timeObj.months > 1 ? "s" : ""}`, timeObj.months) : "",
            timeObj.weeks ? this.getTime(`week${timeObj.weeks > 1 ? "s" : ""}`, timeObj.weeks) : "",
            timeObj.days ? this.getTime(`day${timeObj.weeks > 1 ? "s" : ""}`, timeObj.days) : "",
            timeObj.hours ? this.getTime(`hour${timeObj.hours > 1 ? "s" : ""}`, timeObj.hours) : "",
            timeObj.minutes ? this.getTime(`minute${timeObj.minutes > 1 ? "s" : ""}`, timeObj.minutes) : "",
            timeObj.seconds ? this.getTime(`second${timeObj.seconds > 1 ? "s" : ""}`, timeObj.seconds) : ""
        ];

        return time.filter((t) => t !== "").slice(0, 4).join(", ");
    }
}