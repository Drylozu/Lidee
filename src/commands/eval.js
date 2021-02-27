const Command = require('../structures/Command');

module.exports = class Eval extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            aliases: ['e'],
            ownerOnly: true
        });
    }

    run(message, args) {
        const startTime = process.hrtime();
        try {
            let evalued = eval(args.join(' '));
            if (typeof evalued !== 'string') {
                let temp = require('util').inspect(evalued, { depth: 1 });
                if (temp >= 1500)
                    temp = require('util').inspect(evalued, { depth: 0 });
                evalued = temp;
            }
            const endTimeMs = process.hrtime(startTime)[0] * 1000000 + process.hrtime(startTime)[1] / 1000;
            message.channel.send(`Evalued in **${endTimeMs}ms.**\`\`\`js\n${evalued.slice(0, 2000)}\n\`\`\``);
        } catch (err) {
            const endTimeMs = process.hrtime(startTime)[0] * 1000000 + process.hrtime(startTime)[1] / 1000;
            message.channel.send(`Evalued in **${endTimeMs}ms.**\`\`\`js\n${err.toString()}\n\`\`\``);
        }
    }
};