const Language = require("../structures/Language");

module.exports = class Spanish extends Language {
    constructor() {
        super({
            // Global
            userNo: `Debes mencionar un usuario o colocar su ID.`,
            userPerms: (permission) => `Debes tener el permiso de \`${this.getConstant("permissions", permission)}\` para ejecutar este comando.`,
            botPerms: (permission) => `Debo tener el permiso de \`${this.getConstant("permissions", permission)}\` para ejecutar este comando.`,
            nsfwChannel: `Este comando solo esta disponible en canales NSFW.`,
            cooldown: (time) => `Debes esperar ${time} segundos para ejecutar este comando.`,
            others: (number) => `y otros ${number} más...`,
            roles: (number) => `Roles (${number})`,
            id: (id) => `ID: ${id}`,
            nothing: "Nada para mostrar...",
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
            userCreated: "Cuenta creada el",
            userJoined: "Entró al servidor el",
            userActivity: "Actividad de usuario",
            userBoosting: "Boosteando desde",
            // Server Command
            serverVanityUrl: "URL de vanidad",
            serverCreated: "Servidor creado el",
            serverOwner: "Server owner",
            serverVerification: "Nivel de verificación",
            serverExplicitContentFilter: "Filtro de contenido multimedia explícito",
            serverDescription: "Descripción del servidor",
            serverFeatures: "Características especiales",
            serverEmojis: "Emojis del servidor",
            serverEmojisNormal: "Emojis normales",
            serverEmojisAnimated: "Emojis animados",
            // Ping Command
            pingCalculating: "Pong! *calculando...*",
            ping: (ms) => `Pong! **${ms}ms**.`,
            // Premium Command
            premiumNo: (prefix) => `¡El servidor no tiene premium!\n\n¿Tienes una llave? Activa el premium en el servidor usando \`${prefix}premium [Llave]\`.`,
            premiumYes: `¡El servidor tiene premium!\nPuedes usar comandos especiales con premium.`,
            premium: `¡Has mejorado el servidor! El servidor ahora tiene premium.\nPuedes usar comandos especiales con premium.`,
            premiumInvalid: "La llave ingresada no es valida o está expirada.",
            // Prefix Command
            prefix: (prefix) => `Mi prefijo en este servidor es \`${prefix}\`.`,
            prefixChange: (prefix) => `Puedes cambiar el prefijo usando \`${prefix}prefix [Prefijo]\`.`,
            prefixChanged: (prefix) => `El prefijo en este servidor ha sido cambiado a \`${prefix}\`.`,
            // Language Command
            languageSupport: "Idioma soportados",
            languageActual: "Idioma actual",
            languageChange: (prefix) => `Puedes cambiar el idioma usando \`${prefix}language [Código de idioma]\`.`,
            languageChanged: (language) => `El idioma del servidor ahora es \`${language}\``
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
            },
            serverFeatures: {
                ANIMATED_ICON: "icono animado",
                BANNER: "banner",
                COMMERCE: "comercio",
                DISCOVERABLE: "reconocible",
                FEATURABLE: "destacable",
                INVITE_SPLASH: "imagen de invitación",
                NEWS: "noticias",
                PARTNERED: "partnerizado",
                PUBLIC: "público",
                PUBLIC_DISABLED: "público desactivado",
                VANITY_URL: "URL de vanidad",
                VERIFIED: "verificado",
                VIP_REGIONS: "regiones VIP",
                WELCOME_SCREEN_ENABLED: "pantalla de bienvenida habilitada"
            },
            activities: {
                PLAYING: "Jugando a",
                STREAMING: "Transmitiendo",
                LISTENING: "Escuchando",
                WATCHING: "Viendo",
                CUSTOM_STATUS: "Estado personalizado"
            },
            verificationLevels: [
                "Sin restricciones.",
                "Deben tener un correo electrónico verificado en su cuenta de Discord.",
                "Deben tener un correo electrónico verificado y estar registrados en Discord por más de 5 minutos.",
                "Deben tener un correo electrónico verificado, estar registrados en Discord por más de 5 minutos y ser un miembro de este servidor por más de 10 minutos.",
                "Deben tener un correo electrónico verificado, estar registrados en Discord por más de 5 minutos, ser un miembro de este servidor por más de 10 minutos y tener un teléfono verificado en su cuenta de Discord."
            ],
            explicitContentFilter: [
                "No analizar ningún contenido multimedia.",
                "Analizar el contenido multimedia de los miembros sin rol.",
                "Analizar el contenido multimedia de todos los miembros."
            ],
            time: {
                seconds: (seconds) => `${seconds} segundos`,
                second: (second) => `${second} segundo`,
                minutes: (minutes) => `${minutes} minutos`,
                minute: (minute) => `${minute} minuto`,
                hours: (hours) => `${hours} horas`,
                hour: (hour) => `${hour} hora`,
                days: (days) => `${days} días`,
                day: (day) => `${day} día`,
                weeks: (weeks) => `${weeks} semanas`,
                week: (week) => `${week} semana`,
                months: (months) => `${months} meses`,
                month: (month) => `${month} mes`,
                years: (years) => `${years} años`,
                year: (year) => `${year} año`,
                ago: (date) => `hace ${date}`,
                elapsed: (time) => `Tiempo transcurrido: **${time}**.`,
                left: (time) => `Tiempo restante: **${time}**.`
            }
        }, {
            // Help Command
            title: `Ayuda`,
            description: (name, prefix) => `Hola, yo soy ${name}. Estoy aquí para ayudarte en todo lo que desees hacer, puedes obtener información del servidor y/o de usuarios, también puedes entretenerte bastante jugando juegos incorporados en mí con tus amigos o simplemente ejecutar la parte administrativa.\n\nMi prefijo en este servidor es \`${prefix}\` pero puedes mencionarme como remplazo al prefijo.\nAbajo encontrarás diferentes categorías con los diferentes comandos que dispongo, cada uno de estos empieza por el prefijo anteriormente mencionado.\n\n¿Deseas información más detallada de un comando? Utiliza \`${prefix}help [Comando]\``,
            categories: ["Información", "Entretenimiento", "Configuración", "Administración", "NSFW"],
            footer: (count) => `${count} comandos disponibles`,
            usage: "Uso",
            aliases: "Alias",
            // Commands Description
            banDescription: "Banea un miembro por ID o mención, se puede agregar una razón.",
            softbanDescription: "Banea un miembro por ID o mención eliminando mensajes por días de antiguedad, una razón se puede agregar.",
            clearDescription: "Elimina mensajes de acuerdo a la cantidad especificada entre 1 y 100.",
            kickDescription: "Expulsa a un miembro, se puede agregar una razón.",
            muteDescription: "Mutea a un miembro sin límite de tiempo definido.",
            unmuteDescription: "Desmutea a un miembro ya muteado.",
            helpDescription: "Muestra este mensaje.",
            userDescription: "Muestra información detallada de un usuario.",
            serverDescription: "Muestra información detallada del servidor.",
            pingDescription: "Muestra la latencia del bot al responder y con el API de Discord.",
            prefixDescription: "Muestra y cambia la configuración del prefijo del servidor.",
            languageDescription: "Muestra y cambia la configuración del idioma del servidor.",
            premiumDescription: "Muestra y establece la configuración premium del servidor.",
            // Commands Usage
            banUsage: (prefix) => `${prefix}ban <Miembro> [Razón]\n${prefix}ban @Deivid#0045\n${prefix}ban 123123123123123123 >:[`,
            softbanUsage: (prefix) => `${prefix}softban <Miembro> [Razón] [Antiguedad de mensajes en días para eliminar]\n${prefix}softban @Deivid#0045\n${prefix}ban 123123123123123123 >:[`,
            clearUsage: (prefix) => `${prefix}clear <Cantidad 1-100>\n${prefix}clear 10`,
            kickUsage: (prefix) => `${prefix}kick <Miembro> [Razón]\n${prefix}kick @Someone#0001\n${prefix}ban 123123123123123123 Estás haciendo spam? Sí? Bieen, expulsado.`,
            muteUsage: (prefix) => `${prefix}mute <Miembro>\n${prefix}mute @Free#7870\n${prefix}mute 123123123123123123`,
            unmuteUsage: (prefix) => `${prefix}unmute <Miembro>\n${prefix}unmute @Deivid#0045\n${prefix}unmute 123123123123123123`,
            helpUsage: (prefix) => `${prefix}help [comando]`,
            userUsage: (prefix) => `${prefix}user`,
            serverUsage: (prefix) => `${prefix}server`,
            pingUsage: (prefix) => `${prefix}ping`,
            prefixUsage: (prefix) => `${prefix}prefix [Prefix]\n${prefix}prefix !`,
            languageUsage: (prefix) => `${prefix}language [Language]\n${prefix}language es`,
            premiumUsage: (prefix) => `${prefix}premium [Key]\n${prefix}premium 237A2C3A58374`
        });

        this.displayName = "spanish";
        this.nativeName = "español";
        this.languageCode = "es";
        this.flag = "🇪🇸";
    }
}