require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const Tryxer = require("./structures/Tryxer.js");

new Tryxer({
    ws: {
        properties: {
            $browser: "Discord iOS"
        }
    },
    botConfig: {
        token: process.env.botToken,
        ownersId: process.env.ownersId,
        mongoDbUrl: process.env.mongoDbUrl
    }
});