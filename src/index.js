require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const Lidee = require("./structures/Lidee");
const bot = new Lidee({
	disableEveryone: true,
    botConfig: {
        token: process.env.botToken,
        mongoDbUrl: process.env.mongoDbUrl,
        errorsChannel: process.env.errorsChannel
    }
});

process.on("unhandledRejection", (reason) => {
    bot.log(reason.toString(), reason);
});