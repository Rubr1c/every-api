import type { Message } from "discord.js";
import { dev_addUserXp, dev_setUserLevel, dev_setUserXp } from "./user";

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
