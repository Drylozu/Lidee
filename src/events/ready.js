module.exports = class {
    constructor(client) {
        this.client = client;
    }

    run() {
        this.client.log("Tryrex Ready!");
    }
}