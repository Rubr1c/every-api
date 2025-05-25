import type { Message } from "discord.js";

export async function handlePing(message: Message): Promise<void> {
    await message.reply('pong');
}
