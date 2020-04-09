const Language = require("../structures/Language");

module.exports = class English extends Language {
    constructor() {
        super({
            // Global
            userNo: `You need to mention an user or provide his ID.`,
            userPerms: (permission) => `You must have the permission \`${this.getConstant("permissions")[permission]}\` to execute this command.`,
            botPerms: (permission) => `I must have the permission \`${this.getConstant("permissions")[permission]}\` to execute this command.`,
            nsfwChannel: `Este comando solo esta disponible en canales NSFW.`,
            cooldown: (time) => `You need wait ${time} seconds to execute this command.`,
            others: (number) => `and ${number} others more...`,
            roles: (number) => `Roles (${number})`,
            id: (id) => `ID: ${id}`,
            nothing: "Nothing to show...",
            // Ban Command
            banNo: `I don't able to ban that member.`,
            ban: (member) => `The member **${member}** has been banned from the server.`,
            banError: `An error ocurred while banning the member.`,
            // Clear Command
            clearNumber: `You must specify how many messages will be deleted.`,
            clearLimit: `You must specify a number between 1 and 100.`,
            clear: (number) => `${number} messages have been deleted.`,
            clearError: `An error ocurred while deleting messages.`,
            // Kick Command
            kickNo: `I don't able to kick that member.`,
            kick: (member) => `The member **${member}** has been kicked from the server.`,
            kickError: `An error ocurred while kicking the member.`,
            // Mute Command
            muteNo: `That member is already muted!`,
            mute: (member) => `The member **${member}** has been muted from the server.`,
            // Unmute Command
            unmuteNo: `That member is not muted!`,
            unmute: (member) => `The member **${member}** has been unmuted from the server.`,
            // User Command
            userPermissions: "User permissions",
            userCreated: "Account created at",
            userJoined: "Member joined at",
            userActivity: "User activity",
            userBoosting: "Boosting since",
            // Server Command
            serverVanityUrl: "Vanity URL",
            serverCreated: "Server created at",
            serverOwner: "Server owner",
            serverVerification: "Verification level",
            serverExplicitContentFilter: "Explicit media content filter",
            serverDescription: "Server description",
            serverFeatures: "Features",
            serverEmojis: "Server emojis",
            serverEmojisNormal: "Normal emojis",
            serverEmojisAnimated: "Animated emojis",
            // Ping Command
            pingCalculating: "Pong! *calculating...*",
            ping: (ms) => `Pong! **${ms}ms**.`,
            // Premium Command
            premiumNo: (prefix) => `The server don't have premium!\n\nYou have a key? Active premium in the server using \`${prefix}premium [Key]\`.`,
            premiumYes: "The server has premium!\nYou can use special commands with premium.",
            premium: "You improved the server! The server now has premium.\nYou can use special commands with premium.",
            premiumInvalid: "The key entered isn't valid or is already expired.",
            // Prefix Command
            prefix: (prefix) => `My prefix in this server is \`${prefix}\`.`,
            prefixChange: (prefix) => `You can change the prefix of the server using: \`${prefix}prefix [Prefix]\`.`,
            prefixChanged: (prefix) => `The prefix in this server has been change to \`${prefix}\`.`,
            // Language Command
            languageSupport: "Supported languages",
            languageActual: "Actual language",
            languageChange: (prefix) => `You can change the language of the server using \`${prefix}language [Language Code]\`.`,
            languageChanged: (language) => `Server language is now \`${language}\`.`
        }, {
            permissions: {
                default: "default permissions",
                ADMINISTRATOR: "administrator",
                CREATE_INSTANT_INVITE: "create instant invite",
                KICK_MEMBERS: "kick members",
                BAN_MEMBERS: "ban members",
                MANAGE_CHANNELS: "manage channels",
                MANAGE_GUILD: "manage guild",
                ADD_REACTIONS: "add reactions",
                VIEW_AUDIT_LOG: "view audit log",
                PRIORITY_SPEAKER: "priority speaker",
                STREAM: "stream",
                VIEW_CHANNEL: "view channel",
                SEND_MESSAGES: "send messages",
                SEND_TTS_MESSAGES: "send TTS messages",
                MANAGE_MESSAGES: "manage messages",
                EMBED_LINKS: "embed links",
                ATTACH_FILES: "attach files",
                READ_MESSAGE_HISTORY: "read message history",
                MENTION_EVERYONE: "mention everyone",
                USE_EXTERNAL_EMOJIS: "use external emojis",
                VIEW_GUILD_INSIGHTS: "view guild insights",
                CONNECT: "connect",
                SPEAK: "speak",
                MUTE_MEMBERS: "mute members",
                DEAFEN_MEMBERS: "deafen members",
                MOVE_MEMBERS: "move members",
                USE_VAD: "use voice activity",
                CHANGE_NICKNAME: "change nickname",
                MANAGE_NICKNAMES: "manage nicknames",
                MANAGE_ROLES: "manage roles",
                MANAGE_WEBHOOKS: "manage webhooks",
                MANAGE_EMOJIS: "manage emojis"
            },
            serverFeatures: {
                ANIMATED_ICON: "animated icon",
                BANNER: "banner",
                COMMERCE: "commerce",
                DISCOVERABLE: "discoverable",
                FEATURABLE: "featurable",
                INVITE_SPLASH: "invite splash",
                NEWS: "news",
                PARTNERED: "partnered",
                PUBLIC: "public",
                PUBLIC_DISABLED: "public disabled",
                VANITY_URL: "vanity URL",
                VERIFIED: "verified",
                VIP_REGIONS: "VIP regions",
                WELCOME_SCREEN_ENABLED: "welcome screen enabled"
            },
            activities: {
                PLAYING: "Playing",
                STREAMING: "Streaming",
                LISTENING: "Listening",
                WATCHING: "Watching",
                CUSTOM_STATUS: "Custom Status"
            },
            verificationLevels: [
                "Unrestricted",
                "Must have a verified email on their Discord account.",
                "Must have a verified email and be registered on Discord for longer than 5 minutes.",
                "Must have a verified email, be registered on Discord for longer than 5 minutes and be a member of this server for longer than 10 minutes.",
                "Must have a verified email, be registered on Discord for longer than 5 minutes, be a member of this server for longer than 10 minutes and have a verified phone on their Discord account."
            ],
            explicitContentFilter: [
                "Don't scan any media content.",
                "Scan media content from members without a role.",
                "Scan media content from all members."
            ],
            time: {
                seconds: (seconds) => `${seconds} seconds`,
                second: (second) => `${second} second`,
                minutes: (minutes) => `${minutes} minutes`,
                minute: (minute) => `${minute} minute`,
                hours: (hours) => `${hours} hours`,
                hour: (hour) => `${hour} hour`,
                days: (days) => `${days} days`,
                day: (day) => `${day} day`,
                weeks: (weeks) => `${weeks} weeks`,
                week: (week) => `${week} week`,
                months: (months) => `${months} months`,
                month: (month) => `${month} month`,
                years: (years) => `${years} years`,
                year: (year) => `${year} year`,
                ago: (date) => `${date} ago`,
                elapsed: (time) => `**${time}** elapsed.`,
                left: (time) => `**${time}** left.`
            }
        }, {
            // Help Command
            title: `Help`,
            description: (name, prefix) => `Hello, I'm ${name}. I'm here to help you in everything you wanna do, you can get information about the server and/or of an user, you can also have a lot of fun playing games incorporated in me with your friends or just execute the administrative part.\n\nMy prefix in this server is \`${prefix}\` but you can mention me as a replacement for the prefix.\nBelow you will find different categories with the different commands I have available, each one of them starts with the previously mentioned prefix.\n\nDo you want more detailed information about a command? Use \`${prefix}help [Command]\``,
            categories: ["Information", "Entertainment", "Configuration", "Administration", "NSFW"],
            footer: (count) => `${count} commands available`,
            usage: "Usage",
            aliases: "Aliases",
            // Commands Description
            banDescription: "Bans a member by ID or mention, reason can be added.",
            softbanDescription: "Bans a member by ID or mention, deleting messages for the specified days old, a reason can be added.",
            clearDescription: "Deletes messages according to the specified quantity between 1 and 100.",
            kickDescription: "Kicks a member, a reason can be added.",
            muteDescription: "Mutes a member, no defined time limit.",
            unmuteDescription: "Unmutes a member already muted.",
            helpDescription: "Shows this message.",
            userDescription: "Shows detailed information of an user.",
            serverDescription: "Shows detailed information of the server.",
            pingDescription: "Shows the latency of the bot when responding and with Discord API.",
            prefixDescription: "Shows and changes the server prefix settings.",
            languageDescription: "Shows and changes the server language settings.",
            premiumDescription: "Shows and set premium server settings.",
            // Commands Usage
            banUsage: (prefix) => `${prefix}ban <Member> [Reason]\n${prefix}ban @Deivid#0045\n${prefix}ban 123123123123123123 >:[`,
            softbanUsage: (prefix) => `${prefix}softban <Member> <Antiquity of messages in days to delete> [Reason]\n${prefix}softban @Deivid#0045\n${prefix}softban 123123123123123123 >:[`,
            clearUsage: (prefix) => `${prefix}clear <Quantity 1-100>\n${prefix}clear 10`,
            kickUsage: (prefix) => `${prefix}kick <Member> [Reason]\n${prefix}kick @Someone#0001\n${prefix}ban 123123123123123123 Are you spamming? Yes? Ookay, kicked.`,
            muteUsage: (prefix) => `${prefix}mute <Member>\n${prefix}mute @Free#7870\n${prefix}mute 123123123123123123`,
            unmuteUsage: (prefix) => `${prefix}unmute <Member>\n${prefix}unmute @Deivid#0045\n${prefix}unmute 123123123123123123`,
            helpUsage: (prefix) => `${prefix}help`,
            userUsage: (prefix) => `${prefix}user`,
            serverUsage: (prefix) => `${prefix}server`,
            pingUsage: (prefix) => `${prefix}ping`,
            prefixUsage: (prefix) => `${prefix}prefix [Prefix]\n${prefix}prefix !`,
            languageUsage: (prefix) => `${prefix}language [Language]\n${prefix}language es`,
            premiumUsage: (prefix) => `${prefix}premium [Key]\n${prefix}premium 237A2C3A58374`
        });

        this.displayName = "english";
        this.nativeName = "english";
        this.languageCode = "en";
        this.flag = "🇺🇸";
    }
}