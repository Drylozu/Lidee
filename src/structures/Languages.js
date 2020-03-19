const { Collection } = require("discord.js");
const fs = require("fs");

module.exports = class LanguageManager {
    constructor() {
        Object.defineProperty(this, "languages", { value: new Collection() });
    }

    loadLanguages(dir) {
        for (let file of fs.readdirSync(dir)) {
            let language = new (require(`../languages/${file}`))();
            if (this.languages.get(language.code)) return;
            this.languages.set(language.code, language);
        }
    }

    get(code) {
        return this.languages.get(code);
    }

    getByDisplayName(name) {
        return this.languages.find((l) => l.displayName === name);
    }
}