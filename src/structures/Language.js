const { Permissions } = require("discord.js");

module.exports = class Language {
    constructor(strings, constants, help) {
        Object.defineProperty(this, "strings", { value: strings });
        Object.defineProperty(this, "constants", { value: constants });
        Object.defineProperty(this, "help", { value: help });

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

    parseMS(milliseconds) {
        if (typeof milliseconds !== 'number') throw new TypeError('Expected a number');

        const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;

        const timeObj = {
            years: roundTowardsZero(milliseconds / 3.154e+10),
            months: roundTowardsZero(milliseconds / 2.628e+9) % 12,
            weeks: roundTowardsZero(milliseconds / 6.048e+8) % 4,
            days: roundTowardsZero(milliseconds / 86400000) % 7,
            hours: roundTowardsZero(milliseconds / 3600000) % 24,
            minutes: roundTowardsZero(milliseconds / 60000) % 60,
            seconds: roundTowardsZero(milliseconds / 1000) % 60,
            milliseconds: roundTowardsZero(milliseconds) % 1000,
            microseconds: roundTowardsZero(milliseconds * 1000) % 1000,
            nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1000
        };

        let time = [
            timeObj.years ? timeObj.years > 1 ? `${timeObj.years} ${this.get("years")}` : `${timeObj.years} ${this.get("year")}` : false,
            timeObj.months ? timeObj.months > 1 ? `${timeObj.months} ${this.get("months")}` : `${timeObj.months} ${this.get("month")}` : false,
            timeObj.weeks ? timeObj.weeks > 1 ? `${timeObj.weeks} ${this.get("weeks")}` : `${timeObj.weeks} ${this.get("week")}` : false,
            timeObj.days ? timeObj.days > 1 ? `${timeObj.days} ${this.get("days")}` : `${timeObj.days} ${this.get("day")}` : false,
            timeObj.hours ? timeObj.hours > 1 ? `${timeObj.hours} ${this.get("hours")}` : `${timeObj.hours} ${this.get("hour")}` : false,
            timeObj.minutes ? timeObj.minutes > 1 ? `${timeObj.minutes} ${this.get("minutes")}` : `${timeObj.minutes} ${this.get("minute")}` : false,
            timeObj.seconds ? timeObj.seconds > 1 ? `${timeObj.seconds} ${this.get("seconds")}` : `${timeObj.seconds} ${this.get("second")}` : false
        ]

        return time.filter(x => x).join(', ')
    }
}