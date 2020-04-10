module.exports = class KeyManager {
    constructor(database) {
        this.db = database;
    }

    getAll() {
        return this.db.find({}).exec();
    }

    get(key) {
        return this.db.findOne({ _id: key }).exec();
    }

    create({ createdBy, expiresAt }) {
        let keyCode = (Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2))
            .split("").map((s, i) => `${[4, 8, 12, 16, 20].includes(i) ? "-" : ""}${s}`)
            .join("").substring(0, 24);
        let key = new this.db({
            _id: keyCode,
            createdBy,
            createdAt: Date.now(),
            expiresAt
        });
        key.save();
        return key;
    }
}