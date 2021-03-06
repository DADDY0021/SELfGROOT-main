const prefix = global.config.prefix; 
const strings = require('../strings.json');
const utils = require('../utils');
const {ALLOWED} = require('../allow.json');
module.exports = (client, message) => {
    if (message.content.indexOf(prefix) == 0) {
        if (message.author.id == client.user.id) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command);
        if (!cmd) return;
        if (!ALLOWED.includes(message.author.id)) {
            return;
        }
        if (!global.config.allowed.includes(message.author.id) && global.config.allowed.length > 0) { utils.log(`${message.author.tag} tried to run the command '${message.content}' but permission was not accepted`); return; }
        

        cmd.run(client, message, args);
        return
    }
};