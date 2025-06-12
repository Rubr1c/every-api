/**
 * @module bot/commands/user
 *
 * Discord bot command handlers for user management operations.
 *
 * Exports:
 *  - newUser(message)
 *  - getUser(message)
 *
 * Provides commands to create new users in the system and retrieve
 * user information including level and experience points.
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import type { Message } from 'discord.js';
import { createUser, getUserByDiscordId } from '@/lib/db/user/user';
import { AppError } from '@/lib/utils/error';

/**
 * Creates a new user account for the Discord user who sent the message.
 *
 * Registers the Discord user in the application database with their
 * Discord ID and username. This is typically called when a user first
 * interacts with the bot.
 *
 * @param message
 *   The Discord message object containing user information.
 * @throws
 *   Handles AppError instances and replies with error messages.
 * @returns
 *   Promise<void> - Replies to the message with confirmation or error.
 */
export async function newUser(message: Message): Promise<void> {
  try {
    await createUser({
      discordId: BigInt(message.author.id),
      username: message.author.username,
    });
    await message.reply('User created sucessfully');
  } catch (err) {
    if (err instanceof AppError) {
      await message.reply(`[${err.statusCode}] ${err.message}`);
    } else {
      await message.reply(`Error creating user`);
    }
  }
}

/**
 * Retrieves and displays user information for the Discord user who sent the message.
 *
 * Shows the user's username, current level, and experience points (XP).
 * The user must already be registered in the system.
 *
 * @param message
 *   The Discord message object containing user information.
 * @throws
 *   Handles AppError instances and replies with error messages.
 * @returns
 *   Promise<void> - Replies with user info or error message.
 */
export async function getUser(message: Message): Promise<void> {
  try {
    const user = await getUserByDiscordId(BigInt(message.author.id));
    await message.reply(
      `${user.username} - [Level ${user.level} - ${user.xp} XP]`
    );
  } catch (err) {
    if (err instanceof AppError) {
      await message.reply(`[${err.statusCode}] ${err.message}`);
    } else {
      await message.reply(`Error fetching user`);
    }
  }
}
