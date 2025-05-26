import type { Message } from "discord.js";
import { dev_addUserXp } from "./user";

export async function handle_dev_cmd(
  cmd: string,
  args: string[],
  message: Message,
): Promise<void> {
  switch (cmd) {
    case "+xp":
      if (args.length !== 1) return;
      return await dev_addUserXp(+args[0], message);
    default:
      return;
  }
}
