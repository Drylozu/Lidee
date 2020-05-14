const { Schema, model } = require("mongoose");

let guildSchema = new Schema({
    _id: {
        type: String
    },
    prefix: {
        type: String,
        default: "l:"
    },
    language: {
        type: String,
        default: "en"
    },
    premium: {
        type: Boolean,
        default: false
    },
    logs: {
        messages: {
            type: String,
            default: ""
        },
        ban: {
            type: String,
            default: ""
        },
        all: {
            type: String,
            default: ""
        }
    }
});

let userSchema = new Schema({
    _id: {
        type: String
    },
    flags: {
        type: Number,
        default: 0
    }
});

exports.guilds = model("Guild", guildSchema);
exports.users = model("User", userSchema);