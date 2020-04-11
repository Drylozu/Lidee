const API = require("../structures/API");

module.exports = class NekosLife extends API {
    constructor() {
        super({
            name: "nekosLife",
            baseURL: "https://nekos.life/api/v2/"
        });
    }

    async getHugImage() {
        let { url } = await this.request("img/hug");
        return url;
    }

    async getKissImage() {
        let { url } = await this.request("img/kiss");
        return url;
    }

    async getPatImage() {
        let { url } = await this.request("img/pat");
        return url;
    }

    async getSlapImage() {
        let { url } = await this.request("img/slap");
        return url;
    }
}