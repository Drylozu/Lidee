const { Schema, model } = require("mongoose");

let guildSchema = new Schema({
    _id: {
        type: String
    },
    prefix: {
        type: String,
        default: "m:"
    },
    language: {
        type: String,
        default: "en"
    },
    premium: {
        type: Boolean,
        default: false
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

let keySchema = new Schema({
    _id: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Number
    },
    usedBy: {
        type: String,
        default: ""
    },
    usedAt: {
        type: Number,
        default: 0
    },
    expiresAt: {
        type: Number,
        default: 9e13
    }
});

exports.guilds = model("Guild", guildSchema);
exports.users = model("User", userSchema);
exports.keys = model("Keys", keySchema);