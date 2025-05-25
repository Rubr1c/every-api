import type { Message } from "discord.js";
import { handlePing } from "./ping";
import { getUser, newUser } from "./user";

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
    default:
      return;
  }
}
