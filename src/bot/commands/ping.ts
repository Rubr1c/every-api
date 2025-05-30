/**
 * @module bot/commands/ping
 *
 * Discord bot command handler for ping/pong functionality.
 *
 * Exports:
 *  - handlePing(message)
 *
 * Provides a simple ping command that responds with "pong" to test
 * bot responsiveness and connectivity.
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import type { Message } from "discord.js";

/**
 * Handles the ping command by responding with "pong".
 *
 * This is a simple connectivity test command that allows users to verify
 * that the bot is online and responding to messages.
 *
 * @param message
 *   The Discord message object that triggered the ping command.
 * @returns
 *   Promise<void> - Replies to the message with "pong".
 */
export async function handlePing(message: Message): Promise<void> {
    await message.reply('pong');
}
