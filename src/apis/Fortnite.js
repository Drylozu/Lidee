const API = require('../structures/API');

module.exports = class Fortnite extends API {
    constructor() {
        super({
            name: 'fortnite',
            baseURL: 'https://fortniteapi.io/',
            key: process.env.fortniteToken
        });
    }

    getChallenges(lang = 'en') {
        return this.request('challenges', { season: 'current', lang });
    }

    async getDailyShop(lang = 'en') {
        const { daily } = await this.request('shop', { lang });
        return daily;
    }

    async getUserId(username) {
        const { account_id: accountId } = await this.request('lookup', { username });
        return accountId;
    }

    async getUserStats(username) {
        const userId = await this.getUserId(username);
        const userStats = await this.request('stats', { account: userId });
        return { ...userStats, id: userId };
    }
};