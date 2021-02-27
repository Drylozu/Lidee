const path = require('path');
const fs = require('fs');

module.exports = class APIManager {
    constructor() {
        this.loadAPIs();
    }

    loadAPIs() {
        for (const file of fs.readdirSync(path.join(__dirname, '../apis/'))) {
            const api = new (require(`../apis/${file}`))();
            this[api.name] = api;
        }
    }
};