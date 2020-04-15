const API = require("../structures/API");

module.exports = class Osu extends API {
    constructor() {
        super({
            name: "roblox",
            baseURL: "https://api.roblox.com/"
        });
    }

    getUserBasics(username) {
        return this.request("users/get-by-username", { username });
    }

    getUserGroups(userId) {
        return this.request(`users/${userId}/groups`);
    }

    async getUserFriends(userId) {
        return [
            ...await this.request(`users/${userId}/friends`, { page: 1 }),
            ...await this.request(`users/${userId}/friends`, { page: 2 }),
            ...await this.request(`users/${userId}/friends`, { page: 3 }),
            ...await this.request(`users/${userId}/friends`, { page: 4 })
        ];
    }
}