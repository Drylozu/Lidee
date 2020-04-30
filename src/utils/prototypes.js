module.exports = () => {
    Array.prototype.getRandom = function (quantity) {
        if (isNaN(quantity)) return this[Math.floor(Math.random() * this.length)];

        let elements = [];
        for (let i = 0; i < quantity; i++) {
            elements.push(this[Math.floor(Math.random() * this.length)])
        }

        return elements;
    }

    Number.random = function (minimum, maximum) {
        if (isNaN(minimum) || isNaN(maximum)) return;
        minimum = Math.ceil(minimum), maximum = Math.floor(maximum);

        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    String.prototype.firstUpperCase = function () {
        return this.replace(/^[a-z]/gi, (c) => c.toUpperCase());
    }

    String.prototype.capitalize = function () {
        return this.replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
    }

    console.clientLog = function (content, error = false, shard = null) {
        this.log(`\x1b[36m[${new Date().toLocaleTimeString()}]${shard ? `\x1b[33m[S${shard}]` : ""}${error ? "\x1b[31m" : "\x1b[32m"}[LOG] \x1b[0m${content}`);
    }
}