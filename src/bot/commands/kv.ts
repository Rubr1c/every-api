import type { Message } from "discord.js";
import { getUserByDiscordId } from "@/lib/user/user";
import { kvGet, kvSet } from "@/lib/kv";

export interface KeyValueParams {
  e?: [];
  [flag: string]: string[] | undefined;
}

export async function setKv(
  key: string,
  value: string,
  encrypt: boolean,
  message: Message,
): Promise<void> {
  const userId = message.author.id;

  const user = await getUserByDiscordId(BigInt(userId));

  await kvSet({ userId: user.id, key, value, isEncrypted: encrypt});

  await message.reply(`${key} was set`);
}

export async function getKv(
  key: string | null,
  message: Message,
): Promise<void> {
  if (!key) {
    return;
  }

  const userId = message.author.id;

  const user = await getUserByDiscordId(BigInt(userId));

  const value = await kvGet(user.id, key);

  message.reply(value ?? `${key} not found`);
}
