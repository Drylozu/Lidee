const Language = require("../structures/Language.js");

module.exports = class Spanish extends Language {
    constructor() {
        super({
            // Global
            userNo: `Debes mencionar un usuario o colocar su ID.`,
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
            unmute: (member) => `El miembro **${member}** ha sido desmuteado del servidor.`
        }, {}, {
            // Help Command
            titleHelp: `Ayuda`,
            descriptionHelp: (name) => `Holaaa, me llaman ${name}.\n\nSoy un bot de utilidad.`,
            titleModeration: `Comandos de moderación`,
            descriptionModeration: (count, commands) => `En esta categoría hay \`${count}\` comndos, esos son:\n\n${commands}`,
            titlePrototype: `Comandos experimentales`,
            descriptionPrototype: (count, commands) => `**Nota**: estos comandos están en desarrollo, pueden contener errores.\n\nEn esta categoría hay \`${count}\` comandos, esos son:\n\n${commands}`
            // Description's Commands
        });

        this.displayName = "spanish";
        this.nativeName = "español";
        this.languageCode = "es";
    }
}