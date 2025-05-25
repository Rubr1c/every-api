import { Client, GatewayIntentBits } from 'discord.js';

declare global {
  var discordBotClient: Client | undefined;
}

export const client: Client =
  global.discordBotClient ?? new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

if (!global.discordBotClient) {
  global.discordBotClient = client;
}

