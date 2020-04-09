require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const Maoid = require("./structures/Maoid");
const bot = new Maoid({
    botConfig: {
        token: process.env.botToken,
        mongoDbUrl: process.env.mongoDbUrl,
        errorsChannel: process.env.errorsChannel
    }
});

process.on("unhandledRejection", (reason) => {
    bot.log(reason.toString(), reason);
});