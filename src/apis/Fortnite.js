const API = require("../structures/API");

module.exports = class Fortnite extends API {
    constructor() {
        super({
            name: "fortnite",
            baseURL: "https://fortniteapi.io/",
            key: process.env.fortniteToken
        });
    }

    getChallenges(lang = "en") {
        return this.request("challenges", { season: "current", lang });
    }

    async getDailyShop(lang = "en") {
        let { daily } = await this.request("shop", { lang });
        return daily;
    }

    async getUserId(username) {
        let { account_id: accountId } = await this.request("lookup", { username });
        return accountId;
    }

    async getUserStats(username) {
        let userId = await this.getUserId(username);
        let userStats = await this.request("stats", { account: userId });
        return { ...userStats, id: userId };
    }
}