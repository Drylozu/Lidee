module.exports = () => {
    Array.prototype.getRandom = (quantity) => {
        if (isNaN(quantity)) return this[Math.floor(Math.random() * this.length)];

        let elements = [];
        for (let i = 0; i < quantity; i++) {
            elements.push(this[Math.floor(Math.random() * this.length)])
        }

        return elements;
    };

    Number.random = (minimum, maximum) => {
        if (isNaN(minimum) || isNaN(maximum)) return;
        minimum = Math.ceil(minimum), maximum = Math.floor(maximum);

        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    };

    String.prototype.capitalize = () => {
        return this.replace(/^[a-z]/gi, (v) => v.toUpperCase());
    };
}