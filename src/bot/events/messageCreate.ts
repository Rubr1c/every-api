import type { Message } from "discord.js";
import { prefix } from "../config";
import { exec_cmd } from "../commands";
import { userLevelTimeouts } from "../level/levelManager";
import { addUserXp } from "@/lib/user";

export async function handleMessageCreate(message: Message): Promise<void> {
  if (message.author.bot) return;

  const prefixed = message.content.startsWith(prefix); 

  if (!userLevelTimeouts.isTimedout(message.author.id) && !prefixed) {
    addUserXp(BigInt(message.author.id));
    userLevelTimeouts.timeout(message.author.id);
  }

  if (!prefixed) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift();

  if (!cmd) return;

  return await exec_cmd(cmd, args, message);
}
