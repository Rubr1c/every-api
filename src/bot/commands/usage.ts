/**
 * @module bot/commands/usage
 *
 * Shows usage for each command
 *
 *
 * Exports:
 *  - usage
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import { prefix } from "@/../bot.config.json";
import type { Message } from "discord.js";

/**
 * Represents usage information and associated message handlers for a command.
 */
type UsageValue = {
  /** The complete usage string, e.g. `"!ping - replies with ping"` */
  literal: string;

  /**
   * Replies with the full `literal` usage string.
   *
   * @param message - The Discord message object to reply to.
   * @returns A promise that resolves once the reply is sent.
   */
  helpMsg: (message: Message) => Promise<void>;

  /**
   * Replies with only the command syntax portion of `literal` (everything before the first `-`).
   *
   * @param message - The Discord message object to reply to.
   * @returns A promise that resolves once the reply is sent.
   */
  usageMsg: (message: Message) => Promise<void>;
};

/**
 * Creates a `UsageValue` entry from a raw usage string.
 *
 * The provided `literal` **must** include a dash (`-`) somewhere after the command syntax.
 * - Throws a `TypeError` if `literal` does not contain a dash.
 * - `helpMsg` replies with the entire `literal`.
 * - `usageMsg` replies with the substring of `literal` up to (but not including) the first dash.
 *
 * @param literal - A usage string in the format `"<prefix><command> ... - <description>"`.
 *                  Example: `"!set <key> <value> {-e} - sets a key to a value with optional encrypt flag."`
 * @throws {TypeError} If `literal` does not include a dash (`-`).
 * @returns A `UsageValue` object containing:
 *   - `literal`: the full string passed in,
 *   - `helpMsg`: a function to reply with the full usage string,
 *   - `usageMsg`: a function to reply with just the command syntax (everything before the dash).
 *
 * @example
 * ```ts
 * const uv = expand("!ping - replies with ping");
 * // uv.literal === "!ping - replies with ping"
 *
 * // Later, inside a command handler:
 * await uv.helpMsg(message);  // Discord bot replies: "!ping - replies with ping"
 * await uv.usageMsg(message); // Discord bot replies: "!ping"
 * ```
 */
function expand(literal: string): UsageValue {
  if (!literal.includes("-")) throw new TypeError("invalid literal");
  return {
    literal,
    helpMsg: async (message) => {
      await message.reply(literal);
    },
    usageMsg: async (message) => {
      await message.reply(literal.substring(0, literal.indexOf("-")));
    },
  };
}

export const usage = {
  ping: expand(`${prefix}ping - returns ping`),
  newuser: expand(
    `${prefix}newuser - creates new user from discord credentials.`,
  ),
  user: expand(`${prefix}user - returns user profile.`),
  set: expand(
    `${prefix}set <key> <value> {-e} - sets a key to a value with optional encrypt flag.\n(Note: key and value must be one word).`,
  ),
  get: expand(`${prefix}get <key> - returns a value to key set previously`),
  note: expand(`${prefix}note {-t} <title> {-c} <content> - saves a new note`),
  note_d: expand(`${prefix}note {-d} <title> - deletes an existing note`),
  notes: expand(
    `${prefix}notes - returns summery of all notes (i.e: not full note content is shown)`,
  ),
  notes_t: expand(`${prefix}notes <title> - returns note from title`),
  dev: {
    plus_xp: expand(`${prefix}dev +xp <ammount> - adds xp to user`),
    equal_xp: expand(`${prefix}dev =xp <number> - sets user xp`),
    equal_level: expand(`${prefix}dev =level <number> - sets user level`),
  },
} as const;
