const { Collection } = require("discord.js");
const path = require("path");
const fs = require("fs");

module.exports = class LanguageManager {
    constructor() {
        Object.defineProperty(this, "languages", { value: new Collection() });
        this.loadLanguages();
    }

    loadLanguages() {
        for (let file of fs.readdirSync(path.join(__dirname, "../languages/"))) {
            let language = new (require(`../languages/${file}`))();
            if (this.languages.get(language.languageCode)) return;
            this.languages.set(language.languageCode, language);
        }
    }

    get(code = "") {
        let lang = this.languages.get(code.toLowerCase());
        if (!lang) 
            return this.languages.get("en");
        return lang;
    }

    getByDisplayName(name = "") {
        let lang = this.languages.find((l) => l.displayName === name.toLowerCase());
        if (!lang)
            return this.languages.find((l) => l.displayName === "english");
        return lang;
    }
}