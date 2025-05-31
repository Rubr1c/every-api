/**
 * @module bot/index
 *
 * Main function to start discord bot
 * 
 * 
 * Exports:
 *  - startBot()
 *
 * @author Ali Zaghloul
 * @license MIT
 */

// For running bot standalone
import dotenv from 'dotenv';
dotenv.config();

import '../global/env';

import { client } from "./client";
import { handleMessageCreate } from "./events/messageCreate";

/** 
 * Start discord bot and register events
 */
export function startBot() {

  client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  client.on("messageCreate", handleMessageCreate);

  client.login(process.env.DISCORD_BOT_TOKEN);
}

startBot();
