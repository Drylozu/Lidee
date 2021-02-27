require('./utils/prototypes')();

const Lidee = require('./structures/Lidee');
const bot = new Lidee({
    partials: ['MESSAGE', 'CHANNEL'],
    botConfig: {
        token: process.env.BOT_TOKEN,
        mongoDbUrl: process.env.MONGODB_URL,
        errorsChannel: process.env.ERRORS_CHANNEL
    }
});

process.on('unhandledRejection', (reason) => {
    bot.log(reason.toString(), reason);
});