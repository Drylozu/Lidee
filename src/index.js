require('./utils/prototypes')();
require('dotenv').config();

const { join } = require('path');

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(join(__dirname, 'bot.js'), { token: process.env.BOT_TOKEN });

manager.spawn();

process.on('unhandledRejection', (reason) => {
    console.clientLog(reason.toString(), reason);
});