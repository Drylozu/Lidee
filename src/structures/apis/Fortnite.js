const phin = require('phin')

class Fortnite {
    constructor(tokenAPI) {
        this.tokenAPI = tokenAPI;
    }

    async getChallenges(language) {
    	let { body } = await phin({
            url: `https://fortniteapi.io/challenges?season=current&lang=${language}`,
            parse: "json",
            headers: {
                Authorization: this.tokenAPI
            }
        });

        return body
    }

    async dailyShop(language) {
    	let { body } = await phin({
            url: `https://fortniteapi.io/shop?lang=${language}`,
            parse: "json",
            headers: {
                Authorization: this.tokenAPI
            }
        });

        return body
    }

    async getAllSeasons() {
        let { body } = await phin({
            url: `https://fortniteapi.io/seasons/list`,
            parse: "json",
            headers: {
                Authorization: this.tokenAPI
            }
        });

        return body
    }

    async getMaps() {
        let { body } = await phin({
            url: `https://fortniteapi.io/maps/list`,
            parse: "json",
            headers: {
                Authorization: this.tokenAPI
            }
        });

        return body
    }

    async userID(username) {
        let { body: { account_id } } = await phin({
            url: `https://fortniteapi.io/lookup?username=${username}`,
            parse: "json",
            headers: {
                Authorization: this.tokenAPI
            }
        });

        return account_id
    }

    async userStats(username) {
        let getUserID = await this.userID(username);
        let { body } = await phin({
            url: `https://fortniteapi.io/stats?account=${getUserID}`,
            parse: "json",
            headers: {
                Authorization: this.tokenAPI
            }
        });

        return body
    }

    async getRecentMatches(username) {
        let getUserID = await this.userID(username);
        let { body } = await phin({
            url: `https://fortniteapi.io/matches?account=${getUserID}`,
            parse: "json",
            headers: {
                Authorization: this.tokenAPI
            }
        });

        return body
    }
}

module.exports = Fortnite