import { EmbedBuilder, type Message } from "discord.js";
import { createNote, getNoteByTitle } from "@/lib/note";
import { getUserByDiscordId } from "@/lib/user/user";
import { AppError } from "@/lib/error";

export interface NoteParams {
  t?: string[];
  c?: string[];
  [flag: string]: string[] | undefined;
}

export async function newNote(
  title: string,
  content: string,
  message: Message,
): Promise<void> {
  const { id } = await getUserByDiscordId(BigInt(message.author.id));
  try {
    await createNote({
      userId: id,
      title,
      content,
    });
    await message.reply("Created new note!");
  } catch (err) {
    if (err instanceof AppError) {
      await message.reply(`[${err.statusCode}] ${err.message}`);
    } else {
      await message.reply(`Error creating note`);
    }
  }
}

export async function getNote(title: string, message: Message): Promise<void> {
  const { id } = await getUserByDiscordId(BigInt(message.author.id));
  if (id === null) {
    await message.reply(`User not found`);
    return;
  }
  try {
    const note = await getNoteByTitle(id, title);
    const embed = new EmbedBuilder()
      .setTitle(note?.title ?? "")
      .setDescription(note?.content.replace("\\n", "\n") ?? "");
    await message.reply({ embeds: [embed] });
  } catch (err) {
    if (err instanceof AppError) {
      await message.reply(`[${err.statusCode}] ${err.message}`);
    } else {
      await message.reply(`Error fetching note`);
    }
  }
}
