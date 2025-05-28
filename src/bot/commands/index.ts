import { Message } from "discord.js";
import { handlePing } from "./ping";
import { getUser, newUser } from "./user";
import { getKv, setKv } from "./kv";
import { env, whitelist } from "@/../bot.config.json";
import { handle_dev_cmd } from "./dev";
import { getNote, newNote, NoteParams } from "./note";

type FlagKey<A extends readonly string[]> = {
  [P in A[number]]: P extends `-${infer K}` ? K : never;
}[A[number]];

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
      //TODO: make usage fn
      if (args.length !== 2) return;

      return await setKv(args[0], args[1], message);
    case "get":
      //TODO: make usage fn
      if (args.length !== 1) return;
      return await getKv(args[0], message);
    case "note":
      const params = getParams(args) as NoteParams;
      const title = params.t?.join(" ");
      const content = params.c?.join(" ");

      return await newNote(title ?? "", content ?? "", message);
    case "notes":
      //TODO: make fetch all notes
      return await getNote(args.join(" ") ?? "", message);
    case "dev":
      if (!whitelist.includes(message.author.id) || env !== "dev") {
        //TODO: remove reply
        await message.reply("no access");
        return;
      }
      return await handle_dev_cmd(args.shift() ?? "", args, message);
    default:
      return;
  }
}
