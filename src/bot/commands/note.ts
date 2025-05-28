import { EmbedBuilder, type Message } from "discord.js";
import { createNote, getNoteByTitle } from "@/lib/note";
import { getUserByDiscordId } from "@/lib/user/user";

export async function newNote(
  title: string,
  content: string,
  message: Message,
): Promise<void> {
  const { id } = await getUserByDiscordId(BigInt(message.author.id));
  await createNote({
    userId: id,
    title,
    content,
  });

  await message.reply("Created new note!");
}

export async function getNote(title: string, message: Message): Promise<void> {
  const { id } = await getUserByDiscordId(BigInt(message.author.id));
  const note = await getNoteByTitle(id, title);
  const embed = new EmbedBuilder()
    .setTitle(note?.title ?? "")
    .setDescription(`\`\`\`${note?.content ?? ""}\`\`\``);
  await message.reply({ embeds: [embed] });
}
