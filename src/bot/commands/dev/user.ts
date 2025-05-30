/**
 * @module bot/commands/dev/user
 *
 * Discord bot command handlers for developer user management operations.
 *
 * Exports:
 *  - dev_addUserXp(xpCount, message)
 *  - dev_setUserXp(xpCount, message)
 *  - dev_setUserLevel(level, message)
 *
 * Provides developer commands for manipulating user experience points
 * and levels for testing and administrative purposes.
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import { dev_addXpToUser, dev_setXp, dev_setLevel } from "@/lib/user/level";
import type { Message } from "discord.js";

/**
 * Adds experience points to the user who sent the message.
 *
 * Increases the user's XP by the specified amount and checks for level ups.
 * If a level up occurs, notifies the user of their new level.
 *
 * @param xpCount
 *   The amount of XP to add to the user (bigint).
 * @param message
 *   The Discord message object containing user information.
 * @returns
 *   Promise<void> - Replies with level up notification or XP added confirmation.
 */
export async function dev_addUserXp(xpCount: bigint, message: Message): Promise<void> {
    const userId = message.author.id;

    const userLevel = await dev_addXpToUser(BigInt(userId), xpCount);

    if (userLevel.leveledup) {
        await message.reply(`Leveled up to level ${userLevel.level}`);
    } else {
        await message.reply(`Added ${xpCount} to ${message.author.username}`);
    }
}

/**
 * Sets the user's experience points to a specific value.
 *
 * Directly sets the user's XP to the specified amount, overriding
 * their current XP value.
 *
 * @param xpCount
 *   The XP value to set for the user (bigint).
 * @param message
 *   The Discord message object containing user information.
 * @returns
 *   Promise<void> - Replies with confirmation of XP change.
 */
export async function dev_setUserXp(xpCount: bigint, message: Message): Promise<void> {
   await dev_setXp(BigInt(message.author.id), xpCount); 
   
   await message.reply(`Set xp for ${message.author.username} to ${xpCount}`);
}

/**
 * Sets the user's level to a specific value.
 *
 * Directly sets the user's level to the specified number, overriding
 * their current level.
 *
 * @param level
 *   The level to set for the user (number).
 * @param message
 *   The Discord message object containing user information.
 * @returns
 *   Promise<void> - Replies with confirmation of level change.
 */
export async function dev_setUserLevel(level: number, message: Message): Promise<void> {
   await dev_setLevel(BigInt(message.author.id), level);
   
   await message.reply(`Set level for ${message.author.username} to ${level}`);
}
