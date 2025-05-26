import { dev_addXpToUser } from "@/lib/user/level";
import type { Message } from "discord.js";

export async function dev_addUserXp(xpCount: number, message: Message): Promise<void> {
    const userId = message.author.id;

    const userLevel = await dev_addXpToUser(BigInt(userId), xpCount);

    if (userLevel.leveledup) {
        await message.reply(`Leveled up to level ${userLevel.level}`);
    } else {
        await message.reply(`Added ${xpCount} to ${message.author.username}`);
    }
}
