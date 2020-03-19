const { Schema, model } = require("mongoose");

let guildSchema = new Schema({
    _id: {
        type: String
    },
    prefix: {
        type: String,
        default: "t?"
    },
    language: {
        type: String,
        default: "en"
    }
});

exports.guilds = model("Guild", guildSchema);