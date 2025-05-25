import type { Message } from "discord.js";
import { handlePing } from "./ping";

export async function exec_cmd(
  cmd: string,
  args: string[],
  message: Message
): Promise<void> {
  switch (cmd) {
    case "ping":
      return await handlePing(message);
    default:
      return;
  }
}
