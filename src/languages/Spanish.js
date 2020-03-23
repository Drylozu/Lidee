const Language = require("../structures/Language.js");

module.exports = class Spanish extends Language {
    constructor() {
        super({
            // Global
            userNo: `Debes mencionar un usuario o colocar su ID.`,
            userPerms: (permission) => `Debes tener el permiso de \`${this.getConstant("permissions", permission)}\` para ejecutar este comando.`,
            botPerms: (permission) => `Debo tener el permiso de \`${this.getConstant("permissions", permission)}\` para ejecutar este comando.`,
            nsfwChannel: `Este comando solo esta disponible en canales NSFW.`,
            cooldown: (time) => `Debes esperar ${time} segundos para ejecutar este comando.`,
            // Ban Command
            banNo: `No puedo banear a ese miembro.`,
            ban: (member) => `El miembro **${member}** ha sido baneado del servidor.`,
            banError: `Ha ocurrido un error mientras se baneaba al miembro.`,
            // Clear Command
            clearNumber: `Debes especifcar cuántos mensajes vas a eliminar.`,
            clearLimit: `Debes especificar un número entre 0 y 100.`,
            clear: (number) => `Han sido eliminados ${number} mensajes.`,
            clearError: `Ha ocurrido un error mientras se eliminaban mensajes.`,
            // Kick Command
            kickNo: `No puedo expulsar a ese miembro.`,
            kick: (member) => `El miembro **${member}** ha sido expulsado del servidor.`,
            kickError: `Ha ocurrido un error mientras se expulsaba al miembro.`,
            // Mute Command
            muteNo: `¡Ese miembro ya está muteado!`,
            mute: (member) => `El miembro **${member}** ha sido muteado del servidor.`,
            // Unmute Command
            unmuteNo: `¡Ese miembro no está muteado!`,
            unmute: (member) => `El miembro **${member}** ha sido desmuteado del servidor.`,
            // User Command
            userPermissions: "Permisos de usuario",

        }, {
            permissions: {
                default: "permisos por defecto",
                ADMINISTRATOR: "administrador",
                CREATE_INSTANT_INVITE: "crear invitación instantánea",
                KICK_MEMBERS: "expulsar miembros",
                BAN_MEMBERS: "banear miembros",
                MANAGE_CHANNELS: "administrar canales",
                MANAGE_GUILD: "administrar servidor",
                ADD_REACTIONS: "añadir reacciones",
                VIEW_AUDIT_LOG: "ver registro de auditoría",
                PRIORITY_SPEAKER: "hablar prioritariamente",
                STREAM: "transmitir",
                VIEW_CHANNEL: "ver canal",
                SEND_MESSAGES: "enviar mensajes",
                SEND_TTS_MESSAGES: "enviar mensajes de texto a voz",
                MANAGE_MESSAGES: "administrar mensajes",
                EMBED_LINKS: "insertar enlaces",
                ATTACH_FILES: "adjuntar archivos",
                READ_MESSAGE_HISTORY: "leer el historial de mensjes",
                MENTION_EVERYONE: "mencionar a todos",
                USE_EXTERNAL_EMOJIS: "usar emojis externos",
                VIEW_GUILD_INSIGHTS: "ver resúmen del servidor",
                CONNECT: "conectar en canales de voz",
                SPEAK: "hablar en canales de voz",
                MUTE_MEMBERS: "silenciar miembros",
                DEAFEN_MEMBERS: "ensordecer miembros",
                MOVE_MEMBERS: "mover miembros",
                USE_VAD: "usar la actividad de voz",
                CHANGE_NICKNAME: "cambiar apodo",
                MANAGE_NICKNAMES: "administrar apodos",
                MANAGE_ROLES: "administrar roles",
                MANAGE_WEBHOOKS: "administrar webhooks",
                MANAGE_EMOJIS: "administrar emojis"
            }
        }, {
            // Help Command
            title: `Ayuda`,
            description: (name, prefix) => `Holaaaa, yo soy ${name}. Estoy aquí para ayudarte en todo lo que desees hacer, puedes obtener información del servidor y/o de usuarios, también puedes entretenerte bastante jugando juegos incorporados en mí con tus amigos o simplemente ejecutar la parte administrativa.\n\nMi prefijo en este servidor es \`${prefix}\`.\nAbajo encontrarás diferentes categorías con los diferentes comandos que dispongo, cada uno de estos empieza por el prefijo anteriormente mencionado.`,
            categories: ["Información", "Entretenimiento", "Administración", "NSFW"],
            footer: (count) => `${count} comandos disponibles`
            // Description's Commands
        });

        this.displayName = "spanish";
        this.nativeName = "español";
        this.languageCode = "es";
    }
}