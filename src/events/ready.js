module.exports = class EventReady {
    constructor(client) {
        this.client = client;
    }

    run() {
        this.client.log("Bot Ready!");
    }
}