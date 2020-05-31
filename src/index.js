require("./utils/prototypes")();
const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });

const { ShardingManager } = require("discord.js");
const Manager = new ShardingManager(join(__dirname, "./bot.js"), { token: process.env.botToken });

Manager.spawn();

process.on("unhandledRejection", (reason) => {
    console.clientLog(reason.toString(), reason);
})