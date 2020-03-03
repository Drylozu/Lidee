const Tryxer = require("./Structures/Tryxer");
const mongoose = require('mongoose');
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let client = new Tryxer({
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