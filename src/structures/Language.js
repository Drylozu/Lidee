module.exports = class Language {
    constructor(strings, constants) {
        this.strings = strings;
        this.constants = constants;
    }

    get(string, ...args) {
        let value = this.strings[string];
        if (typeof value === "function")
            return value(...args);
        else
            return value;
    }

    getConstant(string, ...args) {
        let value = this.strings[string];
        if (typeof value === "function")
            return value(...args);
        else
            return value;
    }
}