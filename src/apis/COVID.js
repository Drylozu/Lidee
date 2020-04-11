const API = require("../structures/API");

module.exports = class COVID extends API {
    constructor() {
        super({
            name: "covid",
            baseURL: "https://api.covid19api.com/"
        });
    }

    async getAllLastUpdate() {
        let { AllUpdated } = await this.request("stats");
        return AllUpdated;
    }

    async getAllStats() {
        let all = await this.request("summary");
        return all;
    }
}