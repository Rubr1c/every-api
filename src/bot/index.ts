import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";

export function startBot() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  client.on("messageCreate", async (message) => {
      if (message.content === "$ping") {
          message.reply("pong");
      }
  })

  client.login(process.env.DISCORD_BOT_TOKEN);
}

startBot();
