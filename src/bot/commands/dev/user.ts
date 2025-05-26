import { dev_addXpToUser, dev_setXp, dev_setLevel } from "@/lib/user/level";
import type { Message } from "discord.js";

export async function dev_addUserXp(xpCount: bigint, message: Message): Promise<void> {
    const userId = message.author.id;

    const userLevel = await dev_addXpToUser(BigInt(userId), xpCount);

    if (userLevel.leveledup) {
        await message.reply(`Leveled up to level ${userLevel.level}`);
    } else {
        await message.reply(`Added ${xpCount} to ${message.author.username}`);
    }
}

export async function dev_setUserXp(xpCount: bigint, message: Message): Promise<void> {
   await dev_setXp(BigInt(message.author.id), xpCount); 
   
   await message.reply(`Set xp for ${message.author.username} to ${xpCount}`);
}

export async function dev_setUserLevel(level: number, message: Message): Promise<void> {
   await dev_setLevel(BigInt(message.author.id), level);
   
   await message.reply(`Set level for ${message.author.username} to ${level}`);
}
