const Command = require("../Structures/Command.js");

module.exports = class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            ownerOnly: true
        });
    }

    run(message, args) {
        let startTime = process.hrtime();
        try {
            let evalued = eval(args.join(" "));
            if (typeof evalued !== "string")
                evalued = require("util").inspect(evalued, { depth: 1 });
            let endTimeMs = process.hrtime(startTime)[0] * 1000000 + process.hrtime(startTime)[1] / 1000;
            message.channel.send(`Evalued in **${endTimeMs}ms.**\`\`\`js\n${evalued}\n\`\`\``);
        } catch (err) {
            let endTimeMs = process.hrtime(startTime)[0] * 1000000 + process.hrtime(startTime)[1] / 1000;
            message.channel.send(`Evalued in **${endTimeMs}ms.**\`\`\`js\n${err.toString()}\n\`\`\``);
        }
    }
}