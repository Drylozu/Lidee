const API = require('../structures/API');

module.exports = class NekosLife extends API {
    constructor() {
        super({
            name: 'nekosLife',
            baseURL: 'https://nekos.life/api/v2/'
        });
    }

    async getHugImage() {
        const { url } = await this.request('img/hug');
        return url;
    }

    async getKissImage() {
        const { url } = await this.request('img/kiss');
        return url;
    }

    async getPatImage() {
        const { url } = await this.request('img/pat');
        return url;
    }

    async getSlapImage() {
        const { url } = await this.request('img/slap');
        return url;
    }
};