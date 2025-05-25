import dotenv from "dotenv";
dotenv.config();

import { client } from "./client";
import { handleMessageCreate } from "./events/messageCreate";

export function startBot() {

  client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  client.on("messageCreate", handleMessageCreate);

  client.login(process.env.DISCORD_BOT_TOKEN);
}

startBot();
