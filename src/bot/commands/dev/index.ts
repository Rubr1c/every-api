/**
 * @module bot/commands/dev/index
 *
 * Discord bot command handlers for developer/admin operations.
 *
 * Exports:
 *  - handle_dev_cmd(cmd, args, message)
 *
 * Provides development and admin commands for managing user XP and levels.
 * Commands include adding XP, setting XP, and setting user levels.
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import type { Message } from "discord.js";
import { dev_addUserXp, dev_setUserLevel, dev_setUserXp } from "./user";

/**
 * Handles developer commands for user management and testing.
 *
 * Routes development commands to appropriate handler functions based on
 * the command string. Supports XP and level manipulation commands.
 *
 * @param cmd
 *   The developer command to execute (string). Supported: "+xp", "=xp", "=level".
 * @param args
 *   Array of command arguments (string[]).
 * @param message
 *   The Discord message object containing user information.
 * @returns
 *   Promise<void> - Routes to specific command handlers or returns silently.
 */
export async function handle_dev_cmd(
  cmd: string,
  args: string[],
  message: Message,
): Promise<void> {
  switch (cmd) {
    case "+xp":
      if (args.length !== 1) return;
      return await dev_addUserXp(BigInt(args[0]), message);
    case "=xp":
      if (args.length !== 1) return;
      return await dev_setUserXp(BigInt(args[0]), message);
    case "=level":
      if (args.length !== 1) return;
      return await dev_setUserLevel(+args[0], message);
    default:
      return;
  }
}
