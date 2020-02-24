const Tryxer = require("./Structures/Tryxer");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
new Tryxer({
  ws: {
    properties: {
      $browser: "Discord iOS"
    }
  },
  botConfig: {
    prefix: "t?",
    token: process.env.TOKEN
  }
});