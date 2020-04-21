const API = require("../structures/API");
const phin = require("phin");

module.exports = class Weez extends API {
    constructor() {
        super({
            name: "weez",
            baseURL: "https://weez.pw/api/"
        });
    }

    getTriggered(image) {
        return this.request("triggered", {
            avatar: image
        });
    }

    getTrump(text) {
        return this.request("trump", {
            texto: text
        });
    }

    getScared(image) {
        return this.request("susto", {
            avatar: image
        });
    }

    getRainbow(image) {
        return this.request("rainbow", {
            avatar: image
        });
    }

    getPaint(image) {
        return this.request("bob", {
            avatar: image
        });
    }

    async request(path, options = {}) {
        let { body } = await phin({
            url: `${this.baseURL}${path}?${Object.entries(options).map((e) => `${e[0]}=${e[1]}`).join("&")}`,
            headers: {
                Clave: process.env.weezToken
            }
        });
        return body;
    }
}