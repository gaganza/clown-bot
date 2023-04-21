const Discord = require("discord.js");
const client = new Discord.Client();
const path = require("path");

let auth;
try {
  auth = require("./auth.json");
} catch (error) {
  auth = { token: process.env.TOKEN };
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  // ignore everyone mentions
  if (message.content.match(Discord.MessageMentions.EVERYONE_PATTERN) !== null)
    return;

  if (message.mentions.has(client.user.id)) {
    const { voice } = message.member;

    if (!voice.channelID) {
      message.reply("You must be in a voice channel");
    } else {
      const connection = await voice.channel.join();

      connection.play(path.join(__dirname, "./audio/honk.mp3"));

      setTimeout(() => {
        connection.disconnect();
      }, 1_500);
    }
  }
});

client.on("error", (error) => console.log(error));

client.login(auth.token);
