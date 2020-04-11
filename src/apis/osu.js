const API = require("../structures/API");

module.exports = class Osu extends API {
    constructor() {
        super({
            name: "osu",
            baseURL: "https://osu.ppy.sh/api/"
        });
    }

    getUser(username, mode) {
        return this.request("get_user", {
            k: process.env.osuToken,
            u: username,
            m: mode,
            type: "string"
        });
    }
}