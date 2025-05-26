import type { Message } from "discord.js";
import { createUser, getUserByDiscordId } from "@/lib/user";
import { AppError } from "@/lib/error";

export async function newUser(message: Message): Promise<void> {
  try {
    await createUser({
      discordId: BigInt(message.author.id),
      username: message.author.username,
    });
    await message.reply("User created sucessfully");
  } catch (err) {
    if (err instanceof AppError) {
      await message.reply(`[${err.statusCode}] ${err.message}`);
    } else {
      await message.reply(`Error creating user`);
    }
  }
}

export async function getUser(message: Message): Promise<void> {
  try {
      const user = await getUserByDiscordId(BigInt(message.author.id));
    await message.reply(`${user.username} - ${user.level}`);
  } catch (err) {
    if (err instanceof AppError) {
      await message.reply(`[${err.statusCode}] ${err.message}`);
    } else {
      await message.reply(`Error fetching user`);
    }
  }
}

