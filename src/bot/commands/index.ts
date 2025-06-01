/**
 * @module bot/commands/index
 *
 * Index for handling commands.
 *
 *
 * Exports:
 *  - exec_cmd(cmd, args, message)
 *
 * @author Ali Zaghloul
 * @license MIT
 */

import type { Message } from "discord.js";
import { handlePing } from "./ping";
import { getUser, newUser } from "./user";
import { getKv, KeyValueParams, setKv } from "./kv";
import { env, whitelist } from "@/../bot.config.json";
import { handle_dev_cmd } from "./dev";
import { deleteNote, getNote, getNotesSum, newNote, NoteParams } from "./note";
import { usage } from "./usage";

/**
 * Extracts valid flag keys from a string array of CLI-like arguments.
 *
 * For each string in the array that starts with a hyphen (`-`), the hyphen is stripped
 * and the resulting string becomes a valid key. Other strings are ignored.
 *
 * This utility type is used to derive the shape of the resulting parsed parameters object.
 *
 * @template A - A tuple of string literals representing CLI arguments.
 *
 * @example
 * type Flags = FlagKey<["-name", "-age", "file.txt"]>; // "name" | "age"
 */
type FlagKey<A extends readonly string[]> = {
  [P in A[number]]: P extends `-${infer K}` ? K : never;
}[A[number]];

/**
 * Parses an array of CLI-like string arguments into a structured object.
 *
 * Flags must start with `-`, and any values following a flag are grouped
 * under that flag until a new flag appears. The result maps each flag (without the `-`)
 * to an array of its associated values.
 *
 * @template A - A tuple of strings (e.g. from `process.argv.slice(2)`)
 *
 * @param args - An array of CLI-like arguments (flags and values).
 *
 * @returns A record mapping each stripped flag name to a list of its associated values.
 *
 * @example
 * const input = ["-name", "Alice", "Bob", "-age", "30"];
 * const result = getParams(input);
 * // result = {
 * //   name: ["Alice", "Bob"],
 * //   age: ["30"]
 * // }
 */
function getParams<const A extends readonly string[]>(
  args: A,
): Record<FlagKey<A>, string[]> {
  const result = {} as Record<FlagKey<A>, string[]>;
  let currentKey: FlagKey<A> | null = null;

  for (const arg of args) {
    if (arg.startsWith("-") && arg.length > 1) {
      const k = arg.slice(1) as FlagKey<A>;
      if (!(k in result)) result[k] = [];
      currentKey = k;
    } else if (currentKey) {
      result[currentKey].push(arg);
    }
  }

  return result;
}

/**
 * Executes a bot command based on the provided command keyword and arguments.
 *
 * @param cmd - The command keyword (e.g. "ping", "note", "get").
 * @param args - An array of arguments passed with the command.
 * @param message - The Discord message object that triggered the command.
 *
 * @returns void.
 */
export async function exec_cmd(
  cmd: string,
  args: string[],
  message: Message,
): Promise<void> {
  switch (cmd) {
    case "ping":
      return await handlePing(message);
    case "user":
      return await getUser(message);
    case "newuser":
      return await newUser(message);
    case "set":
      if (args.length > 2) return await usage.set.usageMsg(message);

      const kvParams: KeyValueParams = getParams(args);
      return await setKv(args[0], args[1], kvParams.e ? true : false, message);
    case "get":
      if (args.length !== 1) return await usage.get.usageMsg(message);

      return await getKv(args[0], message);
    case "note":
      if (args[0] === "-d") {
        args.shift();

        if (args.length < 1) {
          return await usage.note_d.usageMsg(message);
        }

        return await deleteNote(args.join(" "), message);
      }
      const params: NoteParams = getParams(args);
      const cTitle = params.t?.join(" ");
      const content = params.c?.join(" ");

      if (!cTitle || !content) return await usage.note.usageMsg(message);

      return await newNote(cTitle, content, message);
    case "notes":
      if (args.length === 0) {
        return await getNotesSum(message);
      }

      const gTitle = args.join(" ");
      if (!gTitle) return await usage.notes_t.usageMsg(message);

      return await getNote(gTitle, message);
    case "dev":
      if (!whitelist.includes(message.author.id) || env !== "dev") {
        return;
      }
      return await handle_dev_cmd(args.shift() ?? "", args, message);
    default:
      return;
  }
}
