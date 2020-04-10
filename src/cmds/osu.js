const { MessageEmbed } = require("discord.js");
const Command = require("../structures/Command");

module.exports = class Osu extends Command {
    constructor(client) {
        super(client, {
            name: "osu",
            aliases: [],
            category: 1
        });
    }

    async run(message, args) {

        let user = await this.client.osu.apiCall('/get_user?mode=1', { u: args[0] })
        console.log(user)
        user = await this.client.osu.apiCall('/get_user?mode=2', { u: args[0] })
        console.log(user)
        user = await this.client.osu.apiCall('/get_user?mode=3', { u: args[0] })
        console.log(user)
        user = await this.client.osu.apiCall('/get_user?mode=4', { u: args[0] })
        console.log(user)
    }
}