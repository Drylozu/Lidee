const phin = require("phin");

module.exports = class API {
    constructor({ name, baseURL, key }) {
        Object.defineProperty(this, "key", { value: key });
        this.baseURL = baseURL;
        this.name = name;
    }

    async request(path, options = {}) {
        let headers = this.key ? { Authorization: this.key } : null;
        let { body } = await phin({
            url: `${this.baseURL}${path}?${Object.entries(options).map((e) => `${e[0]}=${e[1]}`).join("&")}`,
            parse: "json",
            headers
        });
        return body;
    }
}