const utils = require('../utils');

module.exports = client => {

    client.user.setActivity("HATERS KARO FEEL", {type: "LISTENING"});

    utils.log(`Logged in as ${client.user.tag} !`);

};