require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const Tryxer = require("./structures/Tryxer.js");
const bot = new Tryxer({
    botConfig: {
        token: process.env.botToken,
        ownersId: process.env.ownersId,
        mongoDbUrl: process.env.mongoDbUrl
    }
});

process.on("unhandledRejection", (reason) => {
    bot.log(reason.toString(), true);
});
