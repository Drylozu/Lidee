module.exports = class Language {
    constructor(strings, constants, help) {
        Object.defineProperty(this, "strings", { value: strings });
        Object.defineProperty(this, "constants", { value: constants });
        Object.defineProperty(this, "help", { value: help });
    }

    get(string, ...args) {
        let value = this.strings[string];
        if (typeof value === "function")
            return value(...args);
        else
            return value;
    }

    getConstant(category, property, ...args) {
        let object = this.constants[category];
        if (typeof object === "object") {
            let value = object[property];
            if (typeof value === "function")
                return value(...args);
            else
                return value;
        } else
            return object;
    }

    getHelp(string, ...args) {
        let value = this.help[string];
        if (typeof value === "function")
            return value(...args);
        else
            return value;
    }
}