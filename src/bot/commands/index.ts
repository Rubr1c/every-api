import { Message } from "discord.js";
import { handlePing } from "./ping";
import { getUser, newUser } from "./user";
import { getKv, setKv } from "./kv";
import { env, whitelist } from '@/../bot.config.json';
import { handle_dev_cmd } from "./dev";

export async function exec_cmd(
  cmd: string,
  args: string[],
  message: Message
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
        if (args.length !== 2) 
            return;
        
        return await setKv(args[0], args[1], message);
    case "get": 
        //TODO: make usage fn
        if (args.length !== 1) 
            return;
        return await getKv(args[0], message); 
    case "dev":
        if (!whitelist.includes(message.author.id) || env !== 'dev') {
            //TODO: remove reply
            await message.reply("no access");
            return; 
        }
        return await handle_dev_cmd(args.shift() ?? "", args, message);
    default:
      return;
  }
}
