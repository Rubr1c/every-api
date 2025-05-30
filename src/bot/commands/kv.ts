/**
 * @module bot/commands/kv
 *
 * Discord bot command handlers for key-value store operations.
 *
 * Exports:
 *  - setKv(key, value, encrypt, message)
 *  - getKv(key, message)
 *  - KeyValueParams interface
 *
 * Provides commands to store and retrieve user-specific key-value pairs
 * with optional encryption support.
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import type { Message } from "discord.js";
import { getUserByDiscordId } from "@/lib/user/user";
import { kvGet, kvSet } from "@/lib/kv";

export interface KeyValueParams {
  e?: [];
  [flag: string]: string[] | undefined;
}

/**
 * Sets a key-value pair for the user who sent the message.
 *
 * @param key
 *   The key to store the value under (string).
 * @param value  
 *   The value to store (string).
 * @param encrypt
 *   Whether to encrypt the value before storing (boolean).
 * @param message
 *   The Discord message object containing user information.
 * @returns
 *   Promise<void> - Replies to the message with confirmation.
 */
export async function setKv(
  key: string,
  value: string,
  encrypt: boolean,
  message: Message,
): Promise<void> {
  const userId = message.author.id;

  const user = await getUserByDiscordId(BigInt(userId));

  await kvSet({ userId: user.id, key, value, isEncrypted: encrypt});

  await message.reply(`${key} was set`);
}

/**
 * Retrieves a value by key for the user who sent the message.
 *
 * @param key
 *   The key to retrieve the value for (string | null).
 * @param message
 *   The Discord message object containing user information.
 * @returns
 *   Promise<void> - Replies to the message with the value or "not found".
 */
export async function getKv(
  key: string | null,
  message: Message,
): Promise<void> {
  if (!key) {
    return;
  }

  const userId = message.author.id;

  const user = await getUserByDiscordId(BigInt(userId));

  const value = await kvGet(user.id, key);

  message.reply(value ?? `${key} not found`);
}
