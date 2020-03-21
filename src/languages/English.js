const Language = require("../structures/Language.js");

module.exports = class English extends Language {
    constructor() {
        super({
            // Global
            userNo: `You need to mention an user or provide his ID.`,
            userPerms: (permission) => `You must have the permission \`${this.getConstant("permissions")[permission]}\` to execute this command.`,
            botPerms: (permission) => `I must have the permission \`${this.getConstant("permissions")[permission]}\` to execute this command.`,
            nsfwChannel: `Este comando solo esta disponible en canales NSFW.`,
            cooldown: (time) => `You need wait ${time} seconds to execute this command.`,
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
            unmute: (member) => `The member **${member}** has been unmuted from the server.`
        }, {
            permissions: {
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
                SEND_TTS_MESSAGES: "send text to spech messages",
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
            }
        }, {
            // Help Command
            titleHelp: `Help`,
            descriptionHelp: (name) => `Hello, I'm ${name}.\n\nI'm a useful bot.`,
            titleModeration: `Moderation Commands`,
            descriptionModeration: (count, commands) => `In this category are \`${count}\` command, these are:\n\n${commands}`,
            titlePrototype: `Prototype Commands`,
            descriptionPrototype: (count, commands) => `**Note**: these commands are in development, may contain errors.\n\nIn this category are \`${count}\` command, these are:\n\n${commands}`
            // Description's Commands
        });

        this.displayName = "english";
        this.nativeName = "english";
        this.languageCode = "en";
    }
}