const phin = require('phin');

module.exports = class API {
    constructor({ name, baseURL, key }) {
        Object.defineProperty(this, 'key', { value: key });
        this.name = name;
        this.baseURL = baseURL;
    }

    async request(path, options = {}) {
        const headers = this.key ? { Authorization: this.key } : null;
        const { body } = await phin({
            url: `${this.baseURL}${path}?${Object.entries(options).map((e) => `${e[0]}=${e[1]}`).join('&')}`,
            parse: 'json',
            headers
        });
        return body;
    }
};