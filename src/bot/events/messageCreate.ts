/**
 * @module bot/events/messageCreate
 *
 * Handler for message creation events.
 * 
 * 
 * Exports:
 *  - handleMessageCreate()
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import type { Message } from "discord.js";
import { prefix } from "@/../bot.config.json";
import { exec_cmd } from "../commands";
import { userLevelTimeouts } from "../level/levelManager";
import { incrementUserXp } from "@/lib/user/level";

/**
 * Handles message creation events.
 *
 * @param message
 *   Message sent by user.
 * @returns
 *   Promise<void>.
 */
export async function handleMessageCreate(message: Message): Promise<void> {
  if (message.author.bot) return;

  const prefixed = message.content.startsWith(prefix); 

  // Check for level timeout for non commands
  if (!userLevelTimeouts.isTimedout(message.author.id) && !prefixed) {
    const userLevel = await incrementUserXp(BigInt(message.author.id));

    if (userLevel.leveledup) {
        message.reply(`Leveled up to level ${userLevel.level}`)
    }

    userLevelTimeouts.timeout(message.author.id);
  }

  if (!prefixed) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift();

  if (!cmd) return;

  return await exec_cmd(cmd, args, message);
}
