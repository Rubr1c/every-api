import type { Message } from "discord.js";
import { getUserByDiscordId } from '@/lib/user'
import { kvGet, kvSet } from "@/lib/kv";

export async function setKv(key: string, value: string, message: Message): Promise<void> {
    const userId = message.author.id;

    const user = await getUserByDiscordId(BigInt(userId)); 

    await kvSet(user.id, key, value);

    await message.reply(`${key} was set`);
}

export async function getKv(key: string | null, message: Message): Promise<void> {
    if (!key) {
        return;
    }

    const userId = message.author.id;

    const user = await getUserByDiscordId(BigInt(userId)); 

    const value = await kvGet(user.id, key);

    message.reply(value ?? `${key} not found`);
}
