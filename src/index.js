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
  if (message.mentions.has(client.user.id)) {
    const { voice } = message.member;

    if (!voice.channelID) {
      message.reply("You must be in a voice channel");
    } else {
      const connection = await voice.channel.join();

      connection.play(path.join(__dirname, "./audio/honk.mp3"));
    }
  }
});

client.login(auth.token);
