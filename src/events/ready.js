module.exports = class EventReady {
    constructor(client) {
        this.client = client;
    }

    run() {
        this.client.log("Bot Ready!");
        this.client.user.setPresence({
            status: "idle",
            activity: {
                name: "commands",
                type: "WATCHING"
            }
        });
    }
}