const ytdl = require("ytdl-core");

const strings = require("../strings.json");
const utils = require("../utils");


/** 
 * @description Play a song with the provided link
 * @param {Discord.Client} client the client thats runs the commands
 * @param {Discord.Message} message the command's message
 * @param {Array<String>}args args[0] must be a link
 */


module.exports.run = async (client, message, args) => {

    if(!args[0]) return ;

    utils.log("Looking for music details...")

    if(utils.isURL(args[0])){
        FUrl = args[0];
    } else {
        FUrl = await utils.getUrl(args)
    };

    let voiceChannel = message.member.voice.channel; 
    const serverQueue = queue.get("queue");
    const songInfo = await ytdl.getBasicInfo(FUrl);

    const song = {
        title: songInfo.videoDetails.title,
        duration: songInfo.videoDetails.lengthSeconds,
        url: FUrl,
        requestedby: message.author.tag
    };

    utils.log("Got music details, preparing the music to be played...")

    if(!serverQueue) {

        const queueConstruct = {
            textchannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 200,
            playing: true,
            loop: true,
            skipped: false
        };

        queue.set("queue", queueConstruct);
        queueConstruct.songs.push(song);

        if (voiceChannel != null) { 



            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;

            utils.play(queueConstruct.songs[0]);

        } else {
            queue.delete("queue");
            return ;
        };
    } else {

        serverQueue.songs.push(song);
        utils.log(`Added music to the queue : ${song.title}`)

        return ;
    };

};

module.exports.names = {
    list: ["play", "p"]
};