const { Collection } = require("discord.js");
const path = require("path");
const fs = require("fs");

module.exports = class LanguageManager {
    constructor(client) {
        Object.defineProperty(this, "languages", { value: new Collection() });
        this.client = client;
        this.loadLanguages();
    }

    loadLanguages() {
        for (let file of fs.readdirSync(path.join(__dirname, "../languages/"))) {
            let language = new (require(`../languages/${file}`))();
            let existingLanguage = this.languages.find((l) => [language.displayName, language.nativeName, language.languageCode, language.flag, language.constructor.name].some((n) => [l.displayName, l.nativeName, l.languageCode, l.flag, l.constructor.name].includes(n)));
            if (existingLanguage) this.client.log(`Languages with equal names found (${file} and ${existingLanguage.displayName})`, true);
            this.languages.set(language.languageCode, language);
        }
    }

    exists(query) {
        return Boolean(this.languages.find((l) => [l.languageCode, l.displayName, l.nativeName].includes(query)));
    }

    getAll() {
        return this.languages;
    }

    get(code) {
        let lang = this.languages.get(code.toLowerCase());
        if (!lang)
            return this.languages.get("en");
        return lang;
    }

    getByDisplayName(name) {
        let lang = this.languages.find((l) => l.displayName === name.toLowerCase());
        if (!lang)
            return this.languages.find((l) => l.displayName === "english");
        return lang;
    }
}