const Lidee = require("./structures/Lidee");
const bot = new Lidee({
    botConfig: {
        token: process.env.botToken,
        mongoDbUrl: process.env.mongoDbUrl,
        errorsChannel: process.env.errorsChannel
    }
});

process.on("unhandledRejection", (reason) => {
    bot.log(reason.toString(), reason);
});