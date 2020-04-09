const { BitField } = require("discord.js");

class UserFlags extends BitField { }

UserFlags.FLAGS = {
    NONE: 0,
    DEVELOPER: 0x1,
    TRANSLATOR: 0x2,
    DONATOR: 0x4
};

module.exports = UserFlags;