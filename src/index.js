require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const Maoid = require("./structures/Maoid.js");
const bot = new Maoid({
    botConfig: {
        token: process.env.botToken,
        ownersId: process.env.ownersId,
        mongoDbUrl: process.env.mongoDbUrl
    }
});

process.on("unhandledRejection", (reason) => {
    bot.log(reason.toString(), true);
}); //test